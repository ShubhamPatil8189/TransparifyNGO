from fastapi import APIRouter
from bson import ObjectId
from database import get_db

router = APIRouter()

@router.get("/transparency/trust-score/{ngo_id}")
async def get_trust_score(ngo_id: str = "global"):
    db = get_db()
    collections = db.list_collection_names()
    
    # Collection detection
    ngo_coll = "ngos" if "ngos" in collections else "NGO"
    camp_coll = "campaigns" if "campaigns" in collections else "Campaign"
    donor_coll = "donors" if "donors" in collections else "Donor"
    
    # Calculate Global Score for TransparifyNGO Project
    score = 70 # Base score for unified project
    factors = {}
    
    # Factor 1: Raising Capacity
    campaigns = list(db[camp_coll].find())
    total_goal = sum(c.get('goalAmount', 0) for c in campaigns)
    total_raised = sum(c.get('totalRaised', 0) for c in campaigns)
    
    capacity_ratio = (total_raised / total_goal) if total_goal > 0 else 0
    capacity_score = int(min(capacity_ratio * 15, 15))
    score += capacity_score
    factors['raising_capacity'] = f"+{capacity_score} ({int(capacity_ratio*100)}% goals met)"

    # Factor 2: Donor Loyalty (System-wide)
    donors = list(db[donor_coll].find())
    total_donors = len(donors)
    repeat_donors = 0
    
    for donor in donors:
        fin_count = len(donor.get('financialDetails', []))
        inkind_count = len(donor.get('inKindDetails', []))
        if (fin_count + inkind_count) > 1:
            repeat_donors += 1
            
    loyalty_ratio = (repeat_donors / total_donors) if total_donors > 0 else 0
    loyalty_score = int(min(loyalty_ratio * 30, 15))
    score += loyalty_score
    factors['donor_loyalty'] = f"+{loyalty_score} ({int(loyalty_ratio*100)}% repeat donors)"

    # Factor 3: Open Transparency
    transparency_active = db[ngo_coll].count_documents({"settings.openTransparency": True}) > 0
    if transparency_active:
        score += 10
        factors['transparency_enabled'] = "+10 (Active)"
    else:
        factors['transparency_enabled'] = "0 (Inactive)"

    score = min(score, 100)
    level = "High" if score > 80 else "Medium" if score > 50 else "Low"

    return {
        "ngo_name": "TransparifyNGO Project",
        "trust_score": score, 
        "level": level, 
        "factors": factors,
        "summary": "Unified project health score."
    }
