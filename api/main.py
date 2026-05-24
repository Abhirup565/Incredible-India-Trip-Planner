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


@app.get("/places-by-state")
def get_places_by_state(state: str):
    """Return all places from the dataset that match the given state name."""
    from recommender import _load_places
    places = _load_places()
    state_lower = state.strip().lower()

    # Build a mapping of normalised state names to original names
    # This helps match API geocoding results like "NCT of Delhi" → "Delhi"
    STATE_ALIASES = {
        "nct of delhi": "Delhi",
        "nct": "Delhi",
        "new delhi": "Delhi",
        "national capital territory of delhi": "Delhi",
        "j&k": "Jammu & Kashmir",
        "jammu and kashmir": "Jammu & Kashmir",
        "a&n islands": "Andaman & Nicobar Islands",
        "andaman and nicobar islands": "Andaman & Nicobar Islands",
        "andaman and nicobar": "Andaman & Nicobar Islands",
        "chhattisgarh": "Chhattisgarh",
        "chattisgarh": "Chhattisgarh",
        "orissa": "Odisha",
        "pondicherry": "Puducherry",
    }

    # Try alias match first
    resolved_state = STATE_ALIASES.get(state_lower, None)

    if not resolved_state:
        # Try exact (case-insensitive) match against dataset states
        dataset_states = set(p["state"] for p in places)
        for ds in dataset_states:
            if ds.lower() == state_lower:
                resolved_state = ds
                break

    if not resolved_state:
        # Try partial/contains match (e.g. "Pradesh" in "Himachal Pradesh")
        dataset_states = set(p["state"] for p in places)
        for ds in dataset_states:
            if state_lower in ds.lower() or ds.lower() in state_lower:
                resolved_state = ds
                break

    if not resolved_state:
        return {"places": [], "state": state, "count": 0}

    matched = [p for p in places if p["state"] == resolved_state]
    # Sort by rating (highest first)
    matched.sort(key=lambda x: -x.get("rating", 0))

    return {"places": matched, "state": resolved_state, "count": len(matched)}


@app.get("/health")
def health():
    return {"status": "ok"}
