"""
Cosine-similarity based recommendation engine for Indian tourist places.

Feature vector layout (binary one-hot):
  [trip_types (7)] + [seasons (5)] + [durations (4)] = 16 dimensions

Each place and the user query are encoded into this vector, then ranked
by cosine similarity.  A state-match bonus is applied afterwards so
that places in the user's selected states are boosted.
"""

import json
import os
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# ── Feature columns (must match frontend constants) ──────────────────────────

TRIP_TYPES = ["nature", "adventure", "mountain", "beach", "heritage", "spiritual", "urban", "wildlife"]
SEASONS    = ["summer", "monsoon", "autumn", "winter", "spring"]
DURATIONS  = ["weekend", "short", "week", "extended"]

FEATURE_LEN = len(TRIP_TYPES) + len(SEASONS) + len(DURATIONS)   # 16
TRIP_TYPE_WEIGHT = 3.0  # Give higher priority to trip type matches


def _load_places():
    """Load the places JSON from the data directory."""
    data_path = os.path.join(os.path.dirname(__file__), "data", "places.json")
    with open(data_path, "r", encoding="utf-8") as f:
        return json.load(f)


def _encode_place(place: dict) -> np.ndarray:
    """Convert a place record into a binary feature vector."""
    vec = np.zeros(FEATURE_LEN)

    for i, t in enumerate(TRIP_TYPES):
        if t in place.get("trip_types", []):
            vec[i] = TRIP_TYPE_WEIGHT

    offset = len(TRIP_TYPES)
    for i, s in enumerate(SEASONS):
        if s in place.get("best_seasons", []):
            vec[offset + i] = 1

    offset += len(SEASONS)
    for i, d in enumerate(DURATIONS):
        if d in place.get("suitable_durations", []):
            vec[offset + i] = 1

    return vec


def _encode_user(trip_types: list, season: str, duration: str) -> np.ndarray:
    """Convert user selections into a binary feature vector."""
    vec = np.zeros(FEATURE_LEN)

    for i, t in enumerate(TRIP_TYPES):
        if t in trip_types:
            vec[i] = TRIP_TYPE_WEIGHT

    offset = len(TRIP_TYPES)
    for i, s in enumerate(SEASONS):
        if s == season:
            vec[offset + i] = 1

    offset += len(SEASONS)
    for i, d in enumerate(DURATIONS):
        if d == duration:
            vec[offset + i] = 1

    return vec


def recommend(trip_types: list, states: list, season: str, duration: str, top_n: int = 15):
    """
    Return the top-N places ranked by cosine similarity to the user query.
    Enforces STRICT filtering for state and trip_type as the highest priority.
    """
    places = _load_places()
    if not places:
        return []

    # 1. STRICT FILTERING: Must match selected states (if any are selected)
    if states:
        places = [p for p in places if p["state"] in states]

    # 2. STRICT FILTERING: Must match AT LEAST ONE selected trip type (if any are selected)
    if trip_types:
        places = [p for p in places if any(t in p.get("trip_types", []) for t in trip_types)]

    # If no places survive the strict filters, return empty
    if not places:
        return []

    # 3. SCORING: Use cosine similarity to rank the surviving places based on
    # how many trip types they hit, and whether they match season/duration.
    user_vec = _encode_user(trip_types, season, duration).reshape(1, -1)
    place_vecs = np.array([_encode_place(p) for p in places])

    # Cosine similarity → 1-D array of scores
    scores = cosine_similarity(user_vec, place_vecs).flatten()

    # Build final list of scored places
    results = []
    for i, place in enumerate(places):
        results.append({
            **place,
            "score": round(float(scores[i]) * 100, 1),
            "outside_state": False
        })

    # Sort by score descending, then by rating descending to break ties
    results.sort(key=lambda x: (-x["score"], -x.get("rating", 0)))
    
    # We can optionally drop items with a 0 score, but since we strictly filtered,
    # all returned items are guaranteed to have the right state and trip type.
    return results[:top_n]
