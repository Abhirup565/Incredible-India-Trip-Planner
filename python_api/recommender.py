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

TRIP_TYPES = ["nature", "adventure", "mountain", "beach", "heritage", "spiritual", "urban"]
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
    If states are selected:
      - If there are matching trip types in the selected states, strictly filter by state.
      - If no matching trip types exist in those states, fall back to showing best matches
        all-India (marked outside_state=True) along with general state options.
    """
    places = _load_places()
    if not places:
        return []

    user_vec = _encode_user(trip_types, season, duration).reshape(1, -1)
    place_vecs = np.array([_encode_place(p) for p in places])

    # Cosine similarity → 1-D array of scores
    scores = cosine_similarity(user_vec, place_vecs).flatten()

    # Build initial list of scored places
    scored_places = []
    for i, place in enumerate(places):
        scored_places.append({
            **place,
            "score": round(float(scores[i]) * 100, 1),
            "outside_state": False
        })

    # State matching logic
    if states:
        state_places = [p for p in scored_places if p["state"] in states]
        
        # Check if any places in the selected states match at least one selected trip type
        has_type_match = any(any(t in p.get("trip_types", []) for t in trip_types) for p in state_places)
        
        if has_type_match:
            # Strict filter: only show places in the selected states
            results = state_places
        else:
            # Fallback: No matching trip types in selected states
            # 1. Best matches from all of India (marked as outside_state)
            all_india_matches = []
            for p in scored_places:
                if p["state"] not in states:
                    all_india_matches.append({**p, "outside_state": True})
            all_india_matches.sort(key=lambda x: (-x["score"], -x.get("rating", 0)))
            
            # 2. General options from the selected states
            state_places.sort(key=lambda x: (-x["score"], -x.get("rating", 0)))
            
            # Merge both (top general state places + top all-India matches)
            results = state_places[:3] + all_india_matches[:top_n]
    else:
        results = scored_places

    # Final sort, filter 0 scores, and limit
    results = [r for r in results if r["score"] > 0]
    results.sort(key=lambda x: (-x["score"], -x.get("rating", 0)))
    return results[:top_n]
