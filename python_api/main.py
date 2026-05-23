"""
FastAPI microservice for the Incredible India Trip Planner.

Run with:
    uvicorn main:app --reload --port 8000
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from recommender import recommend

app = FastAPI(title="India Trip Planner API", version="1.0.0")

# Allow Next.js dev server to call us
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class RecommendRequest(BaseModel):
    trip_types: list[str]
    states: list[str] = []
    season: str
    duration: str
    top_n: int = 15


@app.post("/recommend")
def get_recommendations(req: RecommendRequest):
    results = recommend(
        trip_types=req.trip_types,
        states=req.states,
        season=req.season,
        duration=req.duration,
        top_n=req.top_n,
    )
    return {"places": results, "count": len(results)}


@app.get("/health")
def health():
    return {"status": "ok"}
