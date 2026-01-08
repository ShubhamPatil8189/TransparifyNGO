from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(title="TransparifyNGO AI Service")

# CORS Setup (Allow request from Node.js backend and Frontend if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "AI Service Running", "service": "TransparifyNGO AI"}

from features import fraud_detection, trends, transparency, chatbot, trust_score, fund_allocation, report_gen, impact

app.include_router(fraud_detection.router)
app.include_router(trends.router)
app.include_router(transparency.router)
app.include_router(chatbot.router)
app.include_router(trust_score.router)
app.include_router(fund_allocation.router)
app.include_router(report_gen.router)
app.include_router(impact.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
