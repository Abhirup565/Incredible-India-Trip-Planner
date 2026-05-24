"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import PlaceDetailsModal from "./PlaceDetailsModal";

// ── State Images (reused from ResultsCard) ───────────────────────────────────

const STATE_IMAGES = {
  "Rajasthan": "https://plus.unsplash.com/premium_photo-1661962428918-6a57ab674e23?q=80&w=1170&auto=format&fit=crop",
  "Kerala": "https://plus.unsplash.com/premium_photo-1697729600773-5b039ef17f3b?q=80&w=1170&auto=format&fit=crop",
  "Goa": "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?q=80&w=1169&auto=format&fit=crop",
  "Himachal Pradesh": "https://images.unsplash.com/photo-1620720970374-5b7e67e1e610?q=80&w=1170&auto=format&fit=crop",
  "Maharashtra": "https://plus.unsplash.com/premium_photo-1694475163305-69050e25af54?q=80&w=1170&auto=format&fit=crop",
  "West Bengal": "https://images.unsplash.com/photo-1571679654681-ba01b9e1e117?q=80&w=1074&auto=format&fit=crop",
  "Bihar": "https://images.unsplash.com/photo-1622194993926-1801586d460f?q=80&w=1170&auto=format&fit=crop",
  "Madhya Pradesh": "https://images.unsplash.com/photo-1606298855672-3efb63017be8?q=80&w=1170&auto=format&fit=crop",
  "Andaman & Nicobar Islands": "https://images.unsplash.com/photo-1642498232612-a837df233825?q=80&w=1170&auto=format&fit=crop",
  "Andhra Pradesh": "https://images.unsplash.com/photo-1572333837703-3f5d7a24c714?q=80&w=1074&auto=format&fit=crop",
  "Arunachal Pradesh": "https://plus.unsplash.com/premium_photo-1697729690458-2d64ca777c04?q=80&w=1170&auto=format&fit=crop",
  "Assam": "https://images.unsplash.com/photo-1587889878559-dd7b59ef7eee?q=80&w=1332&auto=format&fit=crop",
  "Chhattisgarh": "https://plus.unsplash.com/premium_photo-1691031429261-aeb324882888?q=80&w=1170&auto=format&fit=crop",
  "Delhi": "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1170&auto=format&fit=crop",
  "Gujarat": "https://images.unsplash.com/photo-1581836850314-3b668c2aa540?q=80&w=1074&auto=format&fit=crop",
  "Haryana": "https://plus.unsplash.com/premium_photo-1661920471538-d4b17c13f74b?q=80&w=1170&auto=format&fit=crop",
  "Jammu & Kashmir": "https://plus.unsplash.com/premium_photo-1697730426664-f04d9916f700?q=80&w=1170&auto=format&fit=crop",
  "Karnataka": "https://plus.unsplash.com/premium_photo-1697730337612-8bd916249e30?q=80&w=1171&auto=format&fit=crop",
  "Ladakh": "https://images.unsplash.com/photo-1593118845043-359e5f628214?q=80&w=1170&auto=format&fit=crop",
  "Lakshadweep": "https://images.unsplash.com/photo-1572431447238-425af66a273b?q=80&w=1074&auto=format&fit=crop",
  "Manipur": "https://images.unsplash.com/photo-1587635861480-414767bd0198?q=80&w=1170&auto=format&fit=crop",
  "Meghalaya": "https://images.unsplash.com/photo-1552978534-9d01e1f91517?q=80&w=1170&auto=format&fit=crop",
  "Mizoram": "https://images.unsplash.com/photo-1629406989647-ed5e7e39e721?q=80&w=1328&auto=format&fit=crop",
  "Nagaland": "https://plus.unsplash.com/premium_photo-1661917179706-33e305a4ee45?q=80&w=1170&auto=format&fit=crop",
  "Odisha": "https://images.unsplash.com/photo-1682703175805-58d01a7039a7?q=80&w=1170&auto=format&fit=crop",
  "Puducherry": "https://images.unsplash.com/photo-1713515883660-4bd1f99dd6d2?q=80&w=1170&auto=format&fit=crop",
  "Punjab": "https://images.unsplash.com/photo-1668083929205-980ae0ca2d1e?q=80&w=1170&auto=format&fit=crop",
  "Sikkim": "https://images.unsplash.com/photo-1613339027986-b94d85708995?q=80&w=1074&auto=format&fit=crop",
  "Tamil Nadu": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1170&auto=format&fit=crop",
  "Telangana": "https://images.unsplash.com/photo-1568484085354-4e6149a3e658?q=80&w=1170&auto=format&fit=crop",
  "Uttar Pradesh": "https://images.unsplash.com/photo-1706186839147-0d708602587b?q=80&w=1170&auto=format&fit=crop",
  "Uttarakhand": "https://images.unsplash.com/photo-1629981352504-b7f5210501c3?q=80&w=1170&auto=format&fit=crop",
  "default": "https://plus.unsplash.com/premium_vector-1720507912883-be7421baf333?q=80&w=1074&auto=format&fit=crop",
};

// ── Trip type styling config (subset for badge display) ──────────────────────

const TRIP_BADGE = {
  nature:    { icon: "🌿", label: "Nature",    bg: "#d8f3dc", color: "#2d6a4f" },
  adventure: { icon: "🧗", label: "Adventure", bg: "#ffe5d9", color: "#ae2012" },
  mountain:  { icon: "⛰️", label: "Mountain",  bg: "#caf0f8", color: "#023e8a" },
  beach:     { icon: "🏖️", label: "Beach",     bg: "#ade8f4", color: "#0077b6" },
  heritage:  { icon: "🏛️", label: "Heritage",  bg: "#ffe8d6", color: "#7b2d00" },
  spiritual: { icon: "🕌", label: "Spiritual", bg: "#f3e5f5", color: "#6a0572" },
  urban:     { icon: "🌆", label: "Urban",     bg: "#e2e2f0", color: "#1b1b2f" },
  wildlife:  { icon: "🐯", label: "Wildlife",  bg: "#e6eedd", color: "#4b5320" },
};


// ── Single carousel card ─────────────────────────────────────────────────────

function CarouselCard({ place, onClick }) {
  const [hovered, setHovered] = useState(false);
  const bgImg = STATE_IMAGES[place.state] || STATE_IMAGES.default;

  return (
    <div
      onClick={() => onClick(place)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: "0 0 280px",
        height: 340,
        borderRadius: 20,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        boxShadow: hovered
          ? "0 16px 48px rgba(201,24,74,0.25), 0 4px 12px rgba(0,0,0,0.12)"
          : "0 8px 28px rgba(0,0,0,0.08)",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "transform 0.5s ease",
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.08) 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.05) 100%)",
          transition: "background 0.35s ease",
        }}
      />

      {/* Rating badge */}
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(12px)",
          padding: "5px 12px",
          borderRadius: 20,
          fontSize: 13,
          fontWeight: 700,
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.25)",
          fontFamily: "'Verdana', sans-serif",
        }}
      >
        ⭐ {place.rating}
      </div>

      {/* Content at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {/* Place name */}
        <h3
          style={{
            margin: 0,
            fontSize: 19,
            fontWeight: 800,
            color: "#fff",
            fontFamily: "'Georgia', serif",
            textShadow: "0 2px 8px rgba(0,0,0,0.4)",
            lineHeight: 1.2,
          }}
        >
          {place.name}
        </h3>

        {/* Description */}
        <p
          style={{
            margin: 0,
            fontSize: 12,
            color: "rgba(255,255,255,0.82)",
            fontFamily: "'Verdana', sans-serif",
            lineHeight: 1.45,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {place.description}
        </p>

        {/* Trip type badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {place.trip_types.slice(0, 3).map((t) => {
            const cfg = TRIP_BADGE[t];
            if (!cfg) return null;
            return (
              <span
                key={t}
                style={{
                  padding: "2px 8px",
                  borderRadius: 10,
                  fontSize: 10,
                  fontWeight: 700,
                  background: `${cfg.bg}cc`,
                  color: cfg.color,
                  fontFamily: "'Verdana', sans-serif",
                }}
              >
                {cfg.icon} {cfg.label}
              </span>
            );
          })}
        </div>

        {/* Best seasons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 11,
            color: "rgba(255,255,255,0.65)",
            fontFamily: "'Verdana', sans-serif",
          }}
        >
          🗓️ Best: {place.best_seasons?.join(", ")}
        </div>
      </div>
    </div>
  );
}


// ── Loading skeleton card ────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div
      style={{
        flex: "0 0 280px",
        height: 340,
        borderRadius: 20,
        background: "linear-gradient(135deg, #f5f0eb 0%, #fde0e9 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
          animation: "shimmer 1.8s infinite",
        }}
      />
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}


// ── Main carousel component ──────────────────────────────────────────────────

export default function NearYouCarousel() {
  const [userState, setUserState] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // ── Check scroll boundaries ──────────────────────────────────────────────
  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }, []);

  // ── Scroll handlers ──────────────────────────────────────────────────────
  function scrollBy(dir) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 300, behavior: "smooth" });
  }

  // ── Geolocation + API fetch ──────────────────────────────────────────────
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          // Reverse geocode using OpenStreetMap Nominatim
          const { latitude, longitude } = pos.coords;
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`,
            { headers: { "User-Agent": "IncredibleIndiaTripPlanner/1.0" } }
          );
          const geoData = await geoRes.json();
          const stateName = geoData?.address?.state;

          if (!stateName) {
            setError("Could not determine your state");
            setLoading(false);
            return;
          }

          setUserState(stateName);

          // Fetch places for this state from our API
          const placesRes = await fetch(
            `/api/places-by-state?state=${encodeURIComponent(stateName)}`
          );
          const placesData = await placesRes.json();

          if (placesData.places && placesData.places.length > 0) {
            setPlaces(placesData.places);
            // Update the state name to the resolved name from our backend
            if (placesData.state) setUserState(placesData.state);
          } else {
            setError("No places found for your state in our collection");
          }
        } catch (err) {
          console.error("NearYouCarousel error:", err);
          setError("Could not fetch nearby attractions");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.warn("Geolocation denied:", err.message);
        setPermissionDenied(true);
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  // Track scroll position
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    updateScrollButtons();
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, [places, updateScrollButtons]);

  // ── Don't render if permission denied ────────────────────────────────────
  if (permissionDenied) {
    return (
      <section style={sectionStyle}>
        <div style={headerStyle}>
          <span style={sparkleStyle}>✨</span>
          <h2 style={titleStyle}>Discover Your State</h2>
          <p style={subtitleStyle}>
            Allow location access to see top attractions near you
          </p>
        </div>
        <div style={permissionCardStyle}>
          <div style={{ fontSize: 42, marginBottom: 8 }}>📍</div>
          <p style={{ margin: 0, fontSize: 15, color: "#7b4f3a", fontFamily: "'Verdana', sans-serif", textAlign: "center", lineHeight: 1.6 }}>
            We need your location to show nearby attractions.
            <br />
            <span style={{ fontSize: 13, color: "#aaa" }}>
              Please enable location in your browser settings and refresh.
            </span>
          </p>
        </div>
      </section>
    );
  }

  // ── Error state ──────────────────────────────────────────────────────────
  if (!loading && error) {
    return null; // Silently hide if there's an error
  }

  return (
    <section style={sectionStyle} id="near-you-section">
      {/* Section header */}
      <div style={headerStyle}>
        <span style={sparkleStyle}>✨</span>
        <h2 style={titleStyle}>
          {loading ? "Finding Your Location..." : `Discover ${userState}`}
        </h2>
        <p style={subtitleStyle}>
          {loading
            ? "Detecting nearby attractions for you"
            : `Top attractions right in your backyard`}
        </p>
        {userState && !loading && (
          <div style={locationBadgeStyle}>
            <span style={{ animation: "pulse 2s ease-in-out infinite" }}>📍</span>
            {userState}
          </div>
        )}
      </div>

      {/* Carousel container */}
      <div style={carouselWrapperStyle}>
        {/* Left arrow */}
        {!loading && places.length > 0 && (
          <button
            onClick={() => scrollBy(-1)}
            style={{
              ...arrowBtnStyle,
              left: -18,
              opacity: canScrollLeft ? 1 : 0,
              pointerEvents: canScrollLeft ? "auto" : "none",
            }}
            aria-label="Scroll left"
          >
            ‹
          </button>
        )}

        {/* Scrollable track */}
        <div ref={scrollRef} style={trackStyle}>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : places.map((place) => (
                <CarouselCard key={place.id} place={place} onClick={setSelectedPlace} />
              ))}
        </div>

        {/* Right arrow */}
        {!loading && places.length > 0 && (
          <button
            onClick={() => scrollBy(1)}
            style={{
              ...arrowBtnStyle,
              right: -18,
              opacity: canScrollRight ? 1 : 0,
              pointerEvents: canScrollRight ? "auto" : "none",
            }}
            aria-label="Scroll right"
          >
            ›
          </button>
        )}
      </div>

      {/* Place count */}
      {!loading && places.length > 0 && (
        <p style={countStyle}>
          {places.length} attraction{places.length !== 1 ? "s" : ""} found in {userState}
        </p>
      )}

      {/* Inject pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
      `}</style>

      {/* Modal */}
      {selectedPlace && (
        <PlaceDetailsModal 
          place={selectedPlace} 
          onClose={() => setSelectedPlace(null)} 
        />
      )}
    </section>
  );
}


// ── Styles ───────────────────────────────────────────────────────────────────

const sectionStyle = {
  width: "100%",
  maxWidth: 900,
  marginTop: 40,
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 20,
};

const headerStyle = {
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 6,
};

const sparkleStyle = {
  fontSize: 20,
  letterSpacing: 6,
};

const titleStyle = {
  margin: 0,
  fontSize: "clamp(1.3rem, 3.5vw, 1.8rem)",
  fontWeight: 900,
  color: "#1a0a00",
  fontFamily: "'Georgia', serif",
};

const subtitleStyle = {
  margin: 0,
  fontSize: 14,
  color: "#9e7060",
  fontFamily: "'Verdana', sans-serif",
  letterSpacing: 0.3,
};

const locationBadgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  marginTop: 6,
  background: "linear-gradient(135deg, #c9184a11, #e07b3911)",
  border: "1px solid #fce4ec",
  borderRadius: 20,
  padding: "6px 16px",
  fontSize: 13,
  fontWeight: 700,
  color: "#c9184a",
  fontFamily: "'Verdana', sans-serif",
};

const carouselWrapperStyle = {
  position: "relative",
  width: "100%",
  padding: "0 24px",
  boxSizing: "border-box",
};

const trackStyle = {
  display: "flex",
  gap: 18,
  overflowX: "auto",
  scrollSnapType: "x mandatory",
  scrollBehavior: "smooth",
  paddingBottom: 8,
  /* Hide scrollbar */
  scrollbarWidth: "none",
  msOverflowStyle: "none",
};

const arrowBtnStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 40,
  height: 40,
  borderRadius: "50%",
  background: "rgba(255,255,255,0.95)",
  border: "1px solid #fce4ec",
  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
  fontSize: 22,
  fontWeight: 700,
  color: "#c9184a",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 3,
  transition: "all 0.3s ease",
  fontFamily: "system-ui",
};

const permissionCardStyle = {
  background: "rgba(255,255,255,0.92)",
  backdropFilter: "blur(12px)",
  borderRadius: 20,
  padding: "32px 40px",
  border: "1px solid #fce4ec",
  boxShadow: "0 8px 28px rgba(0,0,0,0.06)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
};

const countStyle = {
  margin: 0,
  fontSize: 13,
  color: "#c9a09a",
  fontFamily: "'Verdana', sans-serif",
  letterSpacing: 0.5,
};
