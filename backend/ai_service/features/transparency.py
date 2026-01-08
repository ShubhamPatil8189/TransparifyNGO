from fastapi import APIRouter
from database import get_db

router = APIRouter()

@router.get("/transparency/fake-detection")
async def detect_fake_ngos():
    db = get_db()
    collections = db.list_collection_names()
    ngo_coll = "ngos" if "ngos" in collections else "NGO" if "NGO" in collections else None
    
    if not ngo_coll:
        return {"suspicious_ngos": [], "message": "NGO collection not found"}
        
    ngos = list(db[ngo_coll].find())
    suspicious_ngos = []
    
    for ngo in ngos:
        reasons = []
        if not ngo.get('description') or len(ngo.get('description', '')) < 10:
            reasons.append("Description missing or too short")
        if not ngo.get('contactEmail') and not ngo.get('address'):
            reasons.append("No contact information provided")
        
        if reasons:
            suspicious_ngos.append({
                "ngo_id": str(ngo.get('_id')),
                "title": ngo.get('title'),
                "reasons": reasons,
                "confidence": "High" if len(reasons) > 1 else "Medium"
            })
            
    return {"suspicious_ngos": suspicious_ngos}
