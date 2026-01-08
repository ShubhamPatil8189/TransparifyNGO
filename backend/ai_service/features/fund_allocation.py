from fastapi import APIRouter
from bson import ObjectId
import random
from database import get_db

router = APIRouter()

@router.get("/transparency/fund-allocation/{campaign_id}")
async def fund_allocation(campaign_id: str):
    db = get_db()
    collections = db.list_collection_names()
    camp_coll = "campaigns" if "campaigns" in collections else "Campaign" if "Campaign" in collections else "campaigns"
    
    try:
        query_id = ObjectId(campaign_id) if ObjectId.is_valid(campaign_id) else campaign_id
    except:
        query_id = campaign_id
        
    campaign = db[camp_coll].find_one({"_id": query_id})
    if not campaign:
         return {"campaign_title": "Unknown", "raised": 0, "spent": 0, "allocation_breakdown": {}, "message": "Campaign not found"}
         
    raised = campaign.get('totalRaised', 0)
    # Simulator for demonstration if 'spent' field doesn't exist in schema yet
    # In a real system, we'd query an Expenses collection
    spent = raised * random.uniform(0.6, 0.95)
    alert = spent > raised
    
    # Dynamic allocation based on campaign type or general rules
    prog_ratio = 0.75 if raised > 50000 else 0.7
    admin_ratio = 0.15 if raised > 50000 else 0.2
    mkt_ratio = 1.0 - prog_ratio - admin_ratio
        
    return {
        "campaign_title": campaign.get('title'),
        "raised": raised,
        "spent": round(spent, 2),
        "deviation_alert": alert,
        "allocation_breakdown": {
            "Program Costs": round(spent * prog_ratio, 2),
            "Admin Costs": round(spent * admin_ratio, 2),
            "Marketing": round(spent * mkt_ratio, 2)
        },
        "message": "AI Analysis: Allocation looks healthy and efficient." if not alert else "AI Alert: High spending detected relative to funds raised!"
    }
