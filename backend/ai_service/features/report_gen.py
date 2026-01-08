from fastapi import APIRouter, Body
from pydantic import BaseModel
import google.generativeai as genai
import os

router = APIRouter()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

from typing import Optional

class PromptRequest(BaseModel):
    ngo_data: Optional[dict] = {}
    report_type: Optional[str] = "summary"
    prompt_text: Optional[str] = None
    prompt: Optional[str] = None # Support older frontend naming

@router.post("/ai/generate-report")
async def generate_report(request: PromptRequest = Body(...)):
    if not GEMINI_API_KEY:
        return {"report_content": "AI Reporting unavailable. Please configure API Key (GEMINI_API_KEY) in the backend environment."}
    
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        # Determine the primary instruction
        instruction = request.prompt_text or request.prompt or f"Generate a detailed {request.report_type} report."
        data_info = f" Context data: {request.ngo_data}." if request.ngo_data else ""
        
        full_prompt = f"""
        {instruction}
        {data_info}
        
        The report must be professional, structured with Markdown headings, and provide actionable insights.
        """
        
        response = model.generate_content(full_prompt)
        return {"report_content": response.text}
    except Exception as e:
        return {"report_content": f"Error during AI report generation: {str(e)}"}
