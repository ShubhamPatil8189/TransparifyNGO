from pymongo import MongoClient
import os
from datetime import datetime, timedelta
import random
from dotenv import load_dotenv

load_dotenv()

def seed():
    uri = os.getenv("MONGO_URI")
    if not uri:
        print("ERROR: MONGO_URI not found in .env file")
        return
    
    # Extract database name from URI if present, otherwise use 'test'
    # MongoDB Atlas URIs often have the database name after the last slash
    # Example: mongodb+srv://user:pass@cluster.mongodb.net/dbname
    db_name = "test"  # Default to 'test' as per user's requirement
    if "/" in uri and "?" in uri:
        # Extract between last / and ?
        db_name = uri.split("/")[-1].split("?")[0] or "test"
    elif "/" in uri:
        potential_db = uri.split("/")[-1]
        if potential_db and not potential_db.startswith("mongodb"):
            db_name = potential_db
    
    print(f"Connecting to: {uri[:50]}...")
    print(f"Using database: {db_name}")
    
    client = MongoClient(uri)
    db = client.get_database(db_name)

    # Detect collection name (plural/singular)
    collections = db.list_collection_names()
    coll_name = "transactions"
    if "transactions" not in collections and "Transaction" in collections:
        coll_name = "Transaction"
    
    print(f"Seeding to collection: {coll_name}")

    # Remove existing debug seed data if you want, or just add more
    # db[coll_name].delete_many({"donor.name": "AI Test Donor"})

    # Create diverse anomalies with different risk levels
    anomalies = []
    
    # 1. High Risk - Extremely large donation (>10x average)
    anomalies.append({
        "type": "financial",
        "amount": 500000,  # Very high
        "donor": {
            "name": "High Risk Donor",
            "email": "highrisk@example.com"
        },
        "paymentMethod": "razorpay",
        "providerRef": f"pay_high_{random.randint(1000, 9999)}",
        "receipt": f"REC-HIGH-{random.randint(10000, 99999)}",
        "createdAt": datetime.now() - timedelta(days=1)
    })
    
    # 2. High Risk - Another very large donation
    anomalies.append({
        "type": "financial",
        "amount": 350000,
        "donor": {
            "name": "Suspicious Large Donor",
            "email": "suspicious@example.com"
        },
        "paymentMethod": "razorpay",
        "providerRef": f"pay_sus_{random.randint(1000, 9999)}",
        "receipt": f"REC-SUS-{random.randint(10000, 99999)}",
        "createdAt": datetime.now() - timedelta(days=2)
    })
    
    # 3. Medium Risk - Moderately high donation (3-5x average)
    anomalies.append({
        "type": "financial",
        "amount": 25000,
        "donor": {
            "name": "Medium Risk Donor",
            "email": "medium@example.com"
        },
        "paymentMethod": "razorpay",
        "providerRef": f"pay_med_{random.randint(1000, 9999)}",
        "receipt": f"REC-MED-{random.randint(10000, 99999)}",
        "createdAt": datetime.now() - timedelta(days=3)
    })
    
    # 4. Medium Risk - Another moderately high
    anomalies.append({
        "type": "financial",
        "amount": 18000,
        "donor": {
            "name": "Unusual Pattern Donor",
            "email": "unusual@example.com"
        },
        "paymentMethod": "razorpay",
        "providerRef": f"pay_unu_{random.randint(1000, 9999)}",
        "receipt": f"REC-UNU-{random.randint(10000, 99999)}",
        "createdAt": datetime.now() - timedelta(days=4)
    })

    # Add a few normal donations for baseline (so ML can detect anomalies)
    normal_donations = []
    for i in range(3):
        normal_donations.append({
            "type": "financial",
            "amount": 500 + random.randint(-100, 100),
            "donor": {
                "name": f"Regular Donor {i+1}",
                "email": f"regular{i+1}@example.com"
            },
            "paymentMethod": "razorpay",
            "providerRef": f"pay_norm_{random.randint(1000, 9999)}",
            "receipt": f"REC-NORM-{random.randint(10000, 99999)}",
            "createdAt": datetime.now() - timedelta(days=random.randint(5, 15))
        })

    # 3. Add NGO data for fake detection
    if "NGODashboard" in collections or "NGO" in collections or "ngos" in collections:
         ngo_coll = "ngos" if "ngos" in collections else "NGO" if "NGO" in collections else "ngos"
         db[ngo_coll].insert_one({
             "title": "Suspicious NGO Unit",
             "description": "Too short",
             "address": "", # Missing info triggers alert
             "contactEmail": "",
             "createdAt": datetime.now()
         })

    # Insert all data
    db[coll_name].insert_many(normal_donations)
    db[coll_name].insert_many(anomalies)

    print(f"Successfully seeded {len(normal_donations)} normal transactions and {len(anomalies)} anomalies (varying risk levels).")
    print("Anomaly amounts: ₹500,000 (High), ₹350,000 (High), ₹25,000 (Medium), ₹18,000 (Medium)")

if __name__ == "__main__":
    seed()
