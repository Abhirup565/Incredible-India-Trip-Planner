"use client";
import { useState, useMemo } from "react";
import Loader from "../components/Loader";
import StepsBar from "../components/StepsBar";
import Mandala from "../components/Mandala";
import HeroTitle from "../components/HeroTitle";
import TripTypesCard from "../components/TripTypesCard";
import StateSelectionCard from "@/components/StateSelectionCard";
import SeasonSelectionCard from "@/components/SeasonSelectionCard";
import DurationCard from "@/components/DurationCard";
import ReviewCard from "@/components/ReviewCard";
import DoneCard from "@/components/DoneCard";
import ResultsCard from "@/components/ResultsCard";
import NearYouCarousel from "@/components/NearYouCarousel";

// ─── Data ────────────────────────────────────────────────────────────────────

const TRIP_TYPE_CONFIG = {
  nature: {
    label: "Nature",
    icon: "🌿",
    color: "#2d6a4f",
    bg: "#d8f3dc",
    states: [
      "Himachal Pradesh", "Uttarakhand", "Sikkim", "Arunachal Pradesh",
      "Meghalaya", "Assam", "Nagaland", "Kerala", "Karnataka", "Goa",
      "West Bengal", "Madhya Pradesh", "Chhattisgarh", "Odisha",
    ],
  },
  adventure: {
    label: "Adventure",
    icon: "🧗",
    color: "#ae2012",
    bg: "#ffe5d9",
    states: [
      "Himachal Pradesh", "Uttarakhand", "Jammu & Kashmir", "Ladakh",
      "Arunachal Pradesh", "Sikkim", "Rajasthan", "Goa", "Andaman & Nicobar Islands",
      "Lakshadweep", "Karnataka", "Maharashtra",
    ],
  },
  mountain: {
    label: "Mountain",
    icon: "⛰️",
    color: "#023e8a",
    bg: "#caf0f8",
    states: [
      "Himachal Pradesh", "Uttarakhand", "Jammu & Kashmir", "Ladakh",
      "Sikkim", "Arunachal Pradesh", "Nagaland", "Manipur", "Mizoram",
      "Meghalaya", "West Bengal", "Assam",
    ],
  },
  beach: {
    label: "Beach",
    icon: "🏖️",
    color: "#0077b6",
    bg: "#ade8f4",
    states: [
      "Goa", "Kerala", "Tamil Nadu", "Andhra Pradesh", "Odisha",
      "West Bengal", "Maharashtra", "Karnataka", "Andaman & Nicobar Islands",
      "Lakshadweep", "Gujarat", "Puducherry",
    ],
  },
  heritage: {
    label: "Heritage",
    icon: "🏛️",
    color: "#7b2d00",
    bg: "#ffe8d6",
    states: [
      "Rajasthan", "Uttar Pradesh", "Delhi", "Madhya Pradesh", "Gujarat",
      "Maharashtra", "Tamil Nadu", "Karnataka", "Andhra Pradesh",
      "Telangana", "Odisha", "Bihar", "West Bengal", "Punjab",
    ],
  },
  spiritual: {
    label: "Spiritual",
    icon: "🕌",
    color: "#6a0572",
    bg: "#f3e5f5",
    states: [
      "Uttarakhand", "Uttar Pradesh", "Bihar", "Rajasthan", "Gujarat",
      "Tamil Nadu", "Andhra Pradesh", "Telangana", "Karnataka", "Kerala",
      "Maharashtra", "Madhya Pradesh", "Odisha", "West Bengal", "Himachal Pradesh",
    ],
  },
  urban: {
    label: "Urban",
    icon: "🌆",
    color: "#1b1b2f",
    bg: "#e2e2f0",
    states: [
      "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Telangana",
      "West Bengal", "Gujarat", "Rajasthan", "Punjab", "Kerala",
      "Andhra Pradesh", "Uttar Pradesh", "Haryana",
    ],
  },
  wildlife: {
    label: "Wildlife",
    icon: "🐯",
    color: "#4b5320",
    bg: "#e6eedd",
    states: [
      "Assam", "Rajasthan", "Uttarakhand", "West Bengal", "Madhya Pradesh",
      "Gujarat", "Kerala", "Maharashtra", "Karnataka", "Tamil Nadu",
      "Andaman & Nicobar Islands"
    ],
  },
};

const SEASONS = [
  { id: "summer", label: "Summer", icon: "☀️", desc: "Mar – Jun" },
  { id: "monsoon", label: "Monsoon", icon: "🌧️", desc: "Jul – Sep" },
  { id: "autumn", label: "Autumn", icon: "🍂", desc: "Oct – Nov" },
  { id: "winter", label: "Winter", icon: "❄️", desc: "Dec – Feb" },
  { id: "spring", label: "Spring", icon: "🌸", desc: "Feb – Mar" },
];

const DURATIONS = [
  { id: "weekend", label: "Weekend", icon: "⚡", desc: "2 – 3 days" },
  { id: "short", label: "Short Trip", icon: "🗓️", desc: "4 – 6 days" },
  { id: "week", label: "Week-Long", icon: "🌍", desc: "7 – 10 days" },
  { id: "extended", label: "Extended", icon: "🚀", desc: "11+ days" },
];


// ─── Main Component ───────────────────────────────────────────────────────────

export default function IndiaTripPlanner() {
  const [step, setStep] = useState(0);
  const [tripTypes, setTripTypes] = useState([]);
  const [stateQuery, setStateQuery] = useState("");
  const [selectedStates, setSelectedStates] = useState([]);
  const [season, setSeason] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [results, setResults] = useState(null);

  // Merged + deduplicated state list from selected trip types
  const availableStates = useMemo(() => {
    const set = new Set();
    tripTypes.forEach((t) => TRIP_TYPE_CONFIG[t].states.forEach((s) => set.add(s)));
    return [...set].sort();
  }, [tripTypes]);


  function toggleTripType(id) {
    setTripTypes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  function toggleState(name) {
    setSelectedStates((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  }

  async function handleSearch() {
    const payload = {
      trip_types: tripTypes,
      states: selectedStates,
      season,
      duration,
    };
    console.log("🗺️ India Trip Planner — Search Payload:", JSON.stringify(payload, null, 2));
    setLoading(true);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.places) {
        setResults(data.places);
      }
    } catch (err) {
      console.error("Recommendation API error:", err);
    } finally {
      setLoading(false);
      setDone(true);
    }
  }

  function resetAll() {
    setStep(0);
    setTripTypes([]);
    setStateQuery("");
    setSelectedStates([]);
    setSeason(null);
    setDuration(null);
    setDone(false);
    setResults(null);
  }

  // ── Render steps ────────────────────────────────────────────────────────────

  if (done) {
    return (
      <div style={styles.page}>
        <Mandala />
        {results && results.length > 0 ? (
          <ResultsCard places={results} TRIP_TYPE_CONFIG={TRIP_TYPE_CONFIG} resetAll={resetAll} />
        ) : (
          <DoneCard tripTypes={tripTypes} TRIP_TYPE_CONFIG={TRIP_TYPE_CONFIG} resetAll={resetAll} />
        )}
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {loading && <Loader />}
      <Mandala />

      {/* ── Hero Title ── */}
      <HeroTitle />

      {/* ── Step Bar ── */}
      <StepsBar current={step} total={5} />

      {/* ── Card ── */}
      <div style={styles.card}>

        {/* STEP 0 — Trip Types */}
        {step === 0 && <TripTypesCard
          TRIP_TYPE_CONFIG={TRIP_TYPE_CONFIG}
          toggleTripType={toggleTripType}
          tripTypes={tripTypes}
          setStep={setStep}
        />}

        {/* STEP 1 — State Selection */}
        {step === 1 && <StateSelectionCard
          step={step}
          setStep={setStep}
          toggleState={toggleState}
          availableStates={availableStates}
          stateQuery={stateQuery}
          setStateQuery={setStateQuery}
          selectedStates={selectedStates}
          setSelectedStates={setSelectedStates}
        />}

        {/* STEP 2 — Season */}
        {step === 2 && <SeasonSelectionCard
          SEASONS={SEASONS}
          season={season}
          setSeason={setSeason}
          setStep={setStep}
        />}

        {/* STEP 3 — Duration */}
        {step === 3 && <DurationCard
          DURATIONS={DURATIONS}
          duration={duration}
          setDuration={setDuration}
          setStep={setStep}
        />}

        {/* STEP 4 — Review + Search */}
        {step === 4 && <ReviewCard
          tripTypes={tripTypes}
          TRIP_TYPE_CONFIG={TRIP_TYPE_CONFIG}
          selectedStates={selectedStates}
          SEASONS={SEASONS}
          DURATIONS={DURATIONS}
          season={season}
          duration={duration}
          setStep={setStep}
          handleSearch={handleSearch}
        />}
      </div>

      {/* ── Near You Carousel ── */}
      <NearYouCarousel />

      <p style={styles.footer}>Made with ♥ for every wanderer</p>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fff9f0 0%, #fff0f3 50%, #f0f4ff 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 16px 60px",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    position: "relative",
    overflow: "hidden",
  },

  // Card
  card: {
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(12px)",
    borderRadius: 24,
    padding: "clamp(24px, 5vw, 48px)",
    width: "100%",
    maxWidth: 700,
    boxShadow: "0 20px 60px #c9184a18, 0 2px 8px #0002",
    border: "1px solid #fce4ec",
    zIndex: 1,
  },

  footer: {
    marginTop: 36,
    color: "#c9a09a",
    fontSize: 13,
    letterSpacing: 1,
    fontFamily: "'Verdana', sans-serif",
  },
};
