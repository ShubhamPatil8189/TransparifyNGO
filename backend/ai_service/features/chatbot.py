from fastapi import APIRouter, Body
from pydantic import BaseModel
import google.generativeai as genai
import os
from typing import Optional

router = APIRouter()

# Configure Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

class ChatRequest(BaseModel):
    message: str
    context: Optional[dict] = {}

@router.post("/ai/chat")
async def chat_support(request: ChatRequest = Body(...)):
    if not GEMINI_API_KEY:
        return {"response": "AI Chat is unavailable (Missing API Key)."}
    
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        # Construct prompt with context
        prompt = f"You are a helpful assistant for TransparifyNGO, a platform ensuring transparency in donations. User asks: {request.message}. "
        if request.context:
            prompt += f"Context: {request.context}"
            
        response = model.generate_content(prompt)
        return {"response": response.text}
    except Exception as e:
        return {"response": f"Error generating response: {str(e)}"}
