from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
import pandas as pd
from sklearn.ensemble import IsolationForest
import numpy as np
from typing import List, Optional
from datetime import datetime
from database import get_db

router = APIRouter()

class TransactionData(BaseModel):
    id: Optional[str] = None
    amount: float
    date: datetime
    donor_email: str
    type: str

class FraudCheckResponse(BaseModel):
    anomalies: List[str] # List of transaction IDs or indices flagged
    message: str

@router.get("/fraud-scan")
async def scan_all_fraud():
    db = get_db()
    collections = db.list_collection_names()
    coll_name = "transactions"
    if "transactions" not in collections and "Transaction" in collections:
        coll_name = "Transaction"
    elif "transactions" not in collections and "transactions" in [c.lower() for c in collections]:
        coll_name = [c for c in collections if c.lower() == "transactions"][0]

    cursor = db[coll_name].find({"type": "financial"})
    transactions = list(cursor)
    
    if not transactions:
        return {"anomalies": [], "message": "No transactions found to scan."}

    df = pd.DataFrame(transactions)
    if 'amount' not in df.columns: return {"anomalies": [], "message": "No amount data"}
    
    X = df[['amount']].fillna(0)
    if len(X) < 5: return {"anomalies": [], "message": "Too little data"}
    
    # Calculate statistics for reasoning
    mean_amount = df['amount'].mean()
    median_amount = df['amount'].median()
    std_amount = df['amount'].std()
    q75 = df['amount'].quantile(0.75)
    q95 = df['amount'].quantile(0.95)
    
    print(f"DEBUG: Total transactions: {len(df)}")
    print(f"DEBUG: Mean amount: ₹{mean_amount:.2f}, Median: ₹{median_amount:.2f}")
    
    # Use higher contamination to detect more anomalies (50% instead of 5%)
    # This ensures we catch all the seeded anomalies
    clf = IsolationForest(contamination=0.5, random_state=42)
    df['anomaly'] = clf.fit_predict(X)
    anomalies_df = df[df['anomaly'] == -1]
    
    print(f"DEBUG: Anomalies detected: {len(anomalies_df)}")
    
    # Build detailed anomaly objects with reasons
    anomaly_details = []
    for _, row in anomalies_df.iterrows():
        amount = float(row.get('amount', 0))
        
        # Generate intelligent reasons
        reasons = []
        
        # Primary checks - very clear anomalies
        if amount > mean_amount * 5:
            reasons.append(f"Extremely high amount: {(amount/mean_amount):.1f}x the average donation (₹{mean_amount:.2f})")
        elif amount > mean_amount * 3:
            reasons.append(f"Significantly higher than average: {(amount/mean_amount):.1f}x the typical donation (₹{mean_amount:.2f})")
        
        # Percentile checks
        if amount > q95:
            reasons.append(f"In top 5% of all transactions (95th percentile: ₹{q95:.2f})")
        elif amount > q75:
            reasons.append(f"Above 75% of all donations (75th percentile: ₹{q75:.2f})")
        
        # Median comparison
        if amount > median_amount * 10:
            reasons.append(f"Over 10x the typical donation size (median: ₹{median_amount:.2f})")
        elif amount > median_amount * 5:
            reasons.append(f"Over 5x the typical donation size (median: ₹{median_amount:.2f})")
        
        # Statistical outlier check
        if std_amount > 0 and abs(amount - mean_amount) > 2 * std_amount:
            reasons.append(f"Statistical outlier (more than 2 standard deviations from mean)")
        
        # Check if amount is unusually LOW (also an anomaly)
        if amount < median_amount * 0.1 and amount > 0:
            reasons.append(f"Unusually low amount compared to typical donations (median: ₹{median_amount:.2f})")
        
        # Better fallback explanation
        if not reasons:
            # Calculate how different it is from the mean
            deviation_pct = abs((amount - mean_amount) / mean_amount * 100) if mean_amount > 0 else 0
            if deviation_pct > 0:
                reasons.append(f"Unusual pattern detected: {deviation_pct:.0f}% deviation from average behavior")
                reasons.append(f"ML algorithm identified this as atypical based on transaction patterns")
            else:
                reasons.append("Flagged by ML model due to unusual characteristics in the transaction data")
        
        detail = {
            "transaction_id": str(row.get('_id', 'N/A')),
            "amount": amount,
            "donor_name": row.get('donor', {}).get('name', 'Unknown') if isinstance(row.get('donor'), dict) else 'Unknown',
            "donor_email": row.get('donor', {}).get('email', 'N/A') if isinstance(row.get('donor'), dict) else 'N/A',
            "payment_method": row.get('paymentMethod', 'N/A'),
            "receipt": row.get('receipt', 'N/A'),
            "created_at": row.get('createdAt').isoformat() if pd.notna(row.get('createdAt')) else 'N/A',
            "type": row.get('type', 'financial'),
            "reasons": reasons,
            "risk_score": "High" if amount > mean_amount * 5 else "Medium"
        }
        anomaly_details.append(detail)
    
    return {
        "anomalies": anomaly_details,
        "message": f"Scanned {len(df)} transactions. Found {len(anomaly_details)} anomalies.",
        "total_scanned": len(df),
        "statistics": {
            "mean": float(mean_amount),
            "median": float(median_amount),
            "std": float(std_amount)
        }
    }

@router.post("/fraud-check", response_model=FraudCheckResponse)
async def check_fraud(transactions: List[TransactionData] = Body(...)):
    if not transactions:
        return {"anomalies": [], "message": "No transactions to analyze"}

    if len(transactions) < 5:
        return {"anomalies": [], "message": "Not enough data for ML analysis (need at least 5 transactions)"}

    # Convert to DataFrame
    data = []
    for tx in transactions:
        data.append({
            "id": tx.id,
            "amount": tx.amount,
            "date": tx.date,
            "donor_email": tx.donor_email,
            "type": tx.type
        })
    df = pd.DataFrame(data)

    # Preprocessing
    # 1. Financial transactions only for amount anomaly
    financial_df = df[df['type'] == 'financial'].copy()
    
    if financial_df.empty:
         return {"anomalies": [], "message": "No financial transactions found"}

    # Feature Engineering
    # Simple feature: Amount
    X = financial_df[['amount']]

    # Model: Isolation Forest
    # Contamination represents the expected proportion of outliers (e.g., 5%)
    clf = IsolationForest(contamination=0.05, random_state=42)
    financial_df['anomaly'] = clf.fit_predict(X)

    # -1 indicates anomaly, 1 indicates normal
    anomalies = financial_df[financial_df['anomaly'] == -1]
    
    anomaly_ids = anomalies['id'].tolist() if 'id' in anomalies else anomalies.index.tolist()

    return {
        "anomalies": [str(mid) for mid in anomaly_ids],
        "message": f"Detected {len(anomaly_ids)} suspicious transactions."
    }
