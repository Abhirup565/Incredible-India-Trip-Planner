"use client";
import { useEffect } from "react";

export default function PlaceDetailsModal({ place, onClose, TRIP_TYPE_CONFIG }) {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!place) return null;

  // Re-using the same fallback logic for images
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
    "default": "https://plus.unsplash.com/premium_vector-1720507912883-be7421baf333?q=80&w=1074&auto=format&fit=crop"
  };

  const bgImg = STATE_IMAGES[place.state] || STATE_IMAGES.default;

  const handleMapClick = () => {
    const query = encodeURIComponent(`${place.name}, ${place.state}, India`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px",
        animation: "fadeIn 0.2s ease-out",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: 600,
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
          position: "relative",
          animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(0,0,0,0.5)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            cursor: "pointer",
            zIndex: 10,
            backdropFilter: "blur(4px)",
            transition: "background 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.8)")}
          onMouseOut={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.5)")}
        >
          ×
        </button>

        {/* Hero Image */}
        <div
          style={{
            width: "100%",
            height: 240,
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
              padding: "40px 24px 20px",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "#fff",
                fontSize: 28,
                fontFamily: "'Georgia', serif",
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              {place.name}
            </h2>
            <p
              style={{
                margin: "4px 0 0",
                color: "rgba(255,255,255,0.9)",
                fontSize: 15,
                fontFamily: "'Verdana', sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              📍 {place.state}
            </p>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            padding: "24px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Quick Stats */}
          <div style={{ display: "flex", gap: 20, borderBottom: "1px solid #eee", paddingBottom: 16 }}>
            <div>
              <div style={{ fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>Rating</div>
              <div style={{ fontSize: 16, fontWeight: "bold", color: "#e07b39" }}>⭐ {place.rating} / 5</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>Best Time</div>
              <div style={{ fontSize: 15, color: "#333" }}>{place.best_seasons?.join(", ")}</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 style={{ margin: "0 0 8px", fontSize: 16, color: "#1a0a00" }}>About</h3>
            <p style={{ margin: 0, fontSize: 15, color: "#555", lineHeight: 1.6 }}>{place.description}</p>
          </div>

          {/* Tags */}
          {place.tags && place.tags.length > 0 && (
            <div>
              <h3 style={{ margin: "0 0 8px", fontSize: 16, color: "#1a0a00" }}>Highlights</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {place.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: "#f5f0eb",
                      color: "#9e7060",
                      padding: "4px 12px",
                      borderRadius: 16,
                      fontSize: 13,
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button
              onClick={handleMapClick}
              style={{
                flex: 1,
                background: "linear-gradient(135deg, #c9184a, #e07b39)",
                color: "#fff",
                border: "none",
                padding: "14px",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(201, 24, 74, 0.3)",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              🗺️ View on Map
            </button>
            <button
              onClick={() => {
                const query = encodeURIComponent(`Hotels in ${place.name}, ${place.state}`);
                window.open(`https://www.google.com/search?q=${query}`, "_blank");
              }}
              style={{
                flex: 1,
                background: "#f8f9fa",
                color: "#333",
                border: "1px solid #ddd",
                padding: "14px",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#e9ecef")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#f8f9fa")}
            >
              🏨 Find Hotels
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
