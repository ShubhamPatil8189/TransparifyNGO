from fastapi import APIRouter, Body
import google.generativeai as genai
import os

router = APIRouter()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

@router.post("/ai/impact-prediction")
async def predict_impact(data: dict = Body(...)):
    amount = data.get('amount', 0)
    category = data.get('category', 'general')
    
    # Enhance with AI
    if GEMINI_API_KEY:
        try:
            model = genai.GenerativeModel('gemini-2.5-flash')
            prompt = f"""Predict the real-world impact of donating ₹{amount} to an NGO focused on {category}.
            
            Provide a concise, inspiring prediction that shows tangible outcomes.
            Examples: "This amount can provide 50 nutritious meals to underprivileged children" or "This can support basic education for 3 students for an entire month"
            
            Keep the response to 1-2 sentences maximum, very focused on high impact."""
            
            resp = model.generate_content(prompt)
            impact_msg = resp.text
        except Exception as e:
            # Fallback to rule-based
            impact_msg = get_rule_based_impact(amount)
    else:
        # Rule-based fallback when no API key
        impact_msg = get_rule_based_impact(amount)
            
    return {"prediction": impact_msg.strip()}

def get_rule_based_impact(amount: float) -> str:
    if amount >= 10000:
        return f"₹{amount:,} can make a significant impact: support education for multiple children, provide meals for families, or fund essential healthcare services."
    elif amount >= 5000:
        return f"₹{amount:,} can provide educational materials for students, meals for a week, or medical supplies for a community."
    elif amount >= 1000:
        return f"₹{amount:,} can provide meals for children, basic school supplies, or support a family in need."
    else:
        return f"Every contribution counts! ₹{amount:,} can help provide essential items or services to those in need."
