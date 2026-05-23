"use client";
import { useState } from "react";

// ── Color helpers ────────────────────────────────────────────────────────────

function scoreColor(score) {
  if (score >= 80) return "#2d6a4f";
  if (score >= 60) return "#e07b39";
  if (score >= 40) return "#c9184a";
  return "#888";
}

function scoreBg(score) {
  if (score >= 80) return "#d8f3dc";
  if (score >= 60) return "#fff3e0";
  if (score >= 40) return "#fce4ec";
  return "#f5f5f5";
}

// ── State Images Mapping ─────────────────────────────────────────────────────

const STATE_IMAGES = {
  // Add your Unsplash URLs here!
  "Rajasthan": "https://plus.unsplash.com/premium_photo-1661962428918-6a57ab674e23?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Kerala": "https://plus.unsplash.com/premium_photo-1697729600773-5b039ef17f3b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Goa": "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Himachal Pradesh": "https://images.unsplash.com/photo-1620720970374-5b7e67e1e610?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Maharashtra": "https://plus.unsplash.com/premium_photo-1694475163305-69050e25af54?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "West Bengal": "https://images.unsplash.com/photo-1571679654681-ba01b9e1e117?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Bihar": "https://images.unsplash.com/photo-1622194993926-1801586d460f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Madhya Pradesh": "https://images.unsplash.com/photo-1606298855672-3efb63017be8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Andaman & Nicobar Islands": "https://images.unsplash.com/photo-1642498232612-a837df233825?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Andhra Pradesh": "https://images.unsplash.com/photo-1572333837703-3f5d7a24c714?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Arunachal Pradesh": "https://plus.unsplash.com/premium_photo-1697729690458-2d64ca777c04?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Assam": "https://images.unsplash.com/photo-1587889878559-dd7b59ef7eee?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Chattisgarh": "https://plus.unsplash.com/premium_photo-1691031429261-aeb324882888?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Delhi": "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Gujarat": "https://images.unsplash.com/photo-1581836850314-3b668c2aa540?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Haryana": "https://plus.unsplash.com/premium_photo-1661920471538-d4b17c13f74b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Jammu & Kashmir": "https://plus.unsplash.com/premium_photo-1697730426664-f04d9916f700?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Karnataka": "https://plus.unsplash.com/premium_photo-1697730337612-8bd916249e30?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Ladakh": "https://images.unsplash.com/photo-1593118845043-359e5f628214?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Lakshadweep": "https://images.unsplash.com/photo-1572431447238-425af66a273b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Manipur": "https://images.unsplash.com/photo-1587635861480-414767bd0198?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Meghalaya": "https://images.unsplash.com/photo-1552978534-9d01e1f91517?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Mizoram": "https://images.unsplash.com/photo-1629406989647-ed5e7e39e721?q=80&w=1328&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Nagaland": "https://plus.unsplash.com/premium_photo-1661917179706-33e305a4ee45?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Odisha": "https://images.unsplash.com/photo-1682703175805-58d01a7039a7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Puducherry": "https://images.unsplash.com/photo-1713515883660-4bd1f99dd6d2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Punjab": "https://images.unsplash.com/photo-1668083929205-980ae0ca2d1e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Sikkim": "https://images.unsplash.com/photo-1613339027986-b94d85708995?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Tamil Nadu": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Telangana": "https://images.unsplash.com/photo-1568484085354-4e6149a3e658?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Uttar Pradesh": "https://images.unsplash.com/photo-1706186839147-0d708602587b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Uttarakhand": "https://images.unsplash.com/photo-1629981352504-b7f5210501c3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // Default fallback image for states you haven't added yet
  "default": "https://plus.unsplash.com/premium_vector-1720507912883-be7421baf333?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
};

// ── Place Card ───────────────────────────────────────────────────────────────

function PlaceCard({ place, index, TRIP_TYPE_CONFIG }) {
  const [hovered, setHovered] = useState(false);
  const bgImg = STATE_IMAGES[place.state] || STATE_IMAGES.default;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 20,
        border: "1px solid #fce4ec",
        boxShadow: hovered
          ? "0 12px 36px #c9184a22, 0 2px 8px #0002"
          : "0 4px 16px #0001",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* State Image Banner */}
      <div
        style={{
          width: "100%",
          height: 160,
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Rank badge */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          background: "linear-gradient(135deg, #c9184a, #e07b39)",
          color: "#fff",
          fontSize: 11,
          fontWeight: 800,
          padding: "4px 14px 4px 10px",
          borderRadius: "0 0 14px 0",
          letterSpacing: 0.5,
          fontFamily: "'Verdana', sans-serif",
          zIndex: 2,
        }}
      >
        #{index + 1}
      </div>

      {/* Score badge */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 12,
          background: scoreBg(place.score),
          color: scoreColor(place.score),
          fontSize: 13,
          fontWeight: 800,
          padding: "4px 10px",
          borderRadius: 10,
          fontFamily: "'Verdana', sans-serif",
          zIndex: 2,
        }}
      >
        {place.score}% match
      </div>

      {/* Card Content Container */}
      <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Name + State */}
        <div style={{ marginTop: 0 }}>
          <h3
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 800,
              color: "#1a0a00",
              fontFamily: "'Georgia', serif",
            }}
          >
            {place.name}
          </h3>
          <span
            style={{
              fontSize: 13,
              color: "#0077b6",
              fontWeight: 600,
              fontFamily: "'Verdana', sans-serif",
            }}
          >
            📍 {place.state}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: "#6b5a52",
            lineHeight: 1.5,
            fontFamily: "'Verdana', sans-serif",
          }}
        >
          {place.description}
        </p>

        {/* Trip type chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {place.trip_types.map((t) => {
            const cfg = TRIP_TYPE_CONFIG[t];
            if (!cfg) return null;
            return (
              <span
                key={t}
                style={{
                  padding: "3px 9px",
                  borderRadius: 12,
                  fontSize: 11,
                  fontWeight: 600,
                  background: cfg.bg,
                  color: cfg.color,
                  fontFamily: "'Verdana', sans-serif",
                }}
              >
                {cfg.icon} {cfg.label}
              </span>
            );
          })}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {place.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              style={{
                padding: "2px 8px",
                borderRadius: 8,
                fontSize: 10,
                background: "#f5f0eb",
                color: "#9e7060",
                fontFamily: "'Verdana', sans-serif",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Rating + Season */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 4,
            borderTop: "1px solid #fde0e9",
            paddingTop: 10,
          }}
        >
          <span style={{ fontSize: 13, color: "#e07b39", fontWeight: 700 }}>
            ⭐ {place.rating}
          </span>
          <span style={{ fontSize: 11, color: "#aaa", fontFamily: "'Verdana', sans-serif" }}>
            Best: {place.best_seasons.join(", ")}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Results Card (main export) ───────────────────────────────────────────────

export default function ResultsCard({ places, TRIP_TYPE_CONFIG, resetAll }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        width: "100%",
        maxWidth: 900,
        zIndex: 1,
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            fontWeight: 900,
            color: "#1a0a00",
            fontFamily: "'Georgia', serif",
          }}
        >
          🗺️ Your Top Destinations
        </h2>
        <p
          style={{
            margin: "6px 0 0",
            color: "#9e7060",
            fontSize: 14,
            fontFamily: "'Verdana', sans-serif",
          }}
        >
          {places.length} places curated just for you
        </p>
      </div>

      {/* Results grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
          width: "100%",
        }}
      >
        {places.map((place, i) => (
          <PlaceCard
            key={place.id}
            place={place}
            index={i}
            TRIP_TYPE_CONFIG={TRIP_TYPE_CONFIG}
          />
        ))}
      </div>

      {/* Reset button */}
      <button
        onClick={resetAll}
        style={{
          marginTop: 12,
          background: "linear-gradient(135deg, #c9184a, #e07b39)",
          color: "#fff",
          border: "none",
          borderRadius: 14,
          padding: "14px 32px",
          fontSize: 16,
          fontWeight: 800,
          cursor: "pointer",
          fontFamily: "'Georgia', serif",
          boxShadow: "0 6px 20px #c9184a44",
          letterSpacing: 0.5,
          transition: "transform 0.2s",
        }}
      >
        ✦ Plan Another Trip
      </button>
    </div>
  );
}
