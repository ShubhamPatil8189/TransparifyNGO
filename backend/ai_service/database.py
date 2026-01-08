import os
from pymongo import MongoClient

def get_db():
    uri = os.getenv("MONGO_URI", "mongodb://localhost:27017/test")
    # Extract database name from URI
    db_name = "test"
    if "/" in uri and "?" in uri:
        db_name = uri.split("/")[-1].split("?")[0] or "test"
    elif "/" in uri:
        potential_db = uri.split("/")[-1]
        if potential_db and not potential_db.startswith("mongodb"):
            db_name = potential_db
    
    client = MongoClient(uri)
    return client.get_database(db_name)
