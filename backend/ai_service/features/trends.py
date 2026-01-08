from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pandas as pd
from datetime import datetime
from typing import List, Dict, Any
from database import get_db

router = APIRouter()

@router.get("/trends/donation-analysis")
async def donation_trends():
    db = get_db()
    
    # Discovery
    collections = db.list_collection_names()
    print(f"DEBUG: Collections listed: {collections}")
    
    # Identify the correct collection
    coll_name = "transactions"
    if "transactions" not in collections and "Transaction" in collections:
        coll_name = "Transaction"
    elif "transactions" not in collections and "transactions" in [c.lower() for c in collections]:
        # find the actual casing
        coll_name = [c for c in collections if c.lower() == "transactions"][0]

    print(f"DEBUG: Using collection: {coll_name}")
    
    # Fetch data (Case insensitive search for 'financial')
    import re
    cursor = db[coll_name].find({"type": re.compile('financial', re.IGNORECASE)})
    transactions = list(cursor)
    
    # If still empty, try ALL transactions just to see if we get anything
    if not transactions:
        count_all = db[coll_name].count_documents({})
        print(f"DEBUG: Found 0 financial, but {count_all} total in {coll_name}")
        # fallback to all if zero found (for debugging visibility)
        if count_all > 0:
            transactions = list(db[coll_name].find().limit(100))
    
    print(f"DEBUG: Final transactions count for analysis: {len(transactions)}")
    
    if not transactions:
        return {
            "message": "No data available", 
            "collections_found": collections,
            "using_collection": coll_name,
            "total_docs_in_coll": db[coll_name].count_documents({}) if coll_name in collections else 0
        }

    df = pd.DataFrame(transactions)
    # Ensure amount and createdAt exist
    if 'amount' not in df.columns:
        if 'estimatedValue' in df.columns: # In-kind
             df['amount'] = df['estimatedValue']
        else:
             df['amount'] = 0
             
    if 'createdAt' not in df.columns:
         df['createdAt'] = datetime.now()
         
    df['createdAt'] = pd.to_datetime(df['createdAt'])
    
    # Monthly Trends
    monthly = df.groupby(df['createdAt'].dt.to_period('M'))['amount'].sum()
    monthly_trend = {str(k): v for k, v in monthly.items()}

    # High Donation Periods
    peak_month = monthly.idxmax() if not monthly.empty else "N/A"
    
    return {
        "monthly_trends": monthly_trend,
        "peak_period": str(peak_month),
        "total_donations": float(df['amount'].sum()),
        "average_donation": float(df['amount'].mean()) if not df.empty else 0
    }
    
@router.get("/trends/donor-behavior")
async def donor_behavior():
    db = get_db()
    collections = db.list_collection_names()
    
    coll_name = "transactions"
    if "transactions" not in collections and "Transaction" in collections:
        coll_name = "Transaction"
    elif "transactions" not in collections and "transactions" in [c.lower() for c in collections]:
        coll_name = [c for c in collections if c.lower() == "transactions"][0]

    cursor = db[coll_name].find() 
    transactions = list(cursor)
    
    if not transactions:
        return {"message": "No data available.", "collections": collections}

    df = pd.DataFrame(transactions)
    
    # Check for donor field (Mongoose might have 'donor' as sub-object)
    if 'donor' not in df.columns:
         # If it's a flat structure or different name
         if 'donor_email' in df.columns:
              pass
         else:
              return {"message": "Donor data missing", "columns": df.columns.tolist()}

    # Normalize donor_email
    if 'donor' in df.columns:
        df['donor_email'] = df['donor'].apply(lambda x: x.get('email') if isinstance(x, dict) else x)
    
    # Ensure amount exists
    if 'amount' not in df.columns:
        df['amount'] = df.get('estimatedValue', 0)
        
    if 'createdAt' not in df.columns:
        df['createdAt'] = datetime.now()

    # Aggregation per donor
    donor_stats = df.groupby('donor_email').agg({
        'amount': ['sum', 'count', 'mean'],
        'createdAt': 'max' 
    })
    
    donor_stats.columns = ['total_donated', 'donation_count', 'avg_donation', 'last_donation']
    
    # Identify Segments
    donor_stats['segment'] = 'Regular'
    donor_stats.loc[donor_stats['donation_count'] == 1, 'segment'] = 'One-time'
    donor_stats.loc[donor_stats['donation_count'] > 5, 'segment'] = 'Frequent'
    donor_stats.loc[donor_stats['total_donated'] > 10000, 'segment'] = 'High-Impact'

    results = donor_stats.reset_index().to_dict(orient='records')
    for r in results:
        if isinstance(r['last_donation'], datetime):
            r['last_donation'] = r['last_donation'].isoformat()
        else:
            r['last_donation'] = str(r['last_donation'])

    return {
        "donor_segments": results,
        "summary": {
            "total_donors": len(donor_stats),
            "frequent_donors": len(donor_stats[donor_stats['segment'] == 'Frequent']),
            "one_time_donors": len(donor_stats[donor_stats['segment'] == 'One-time']),
             "high_impact_donors": len(donor_stats[donor_stats['segment'] == 'High-Impact'])
        }
    }
