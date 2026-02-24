import { CompStyles } from "@/components_styles/CompStyles";

export default function ReviewCard({
    tripTypes,
    TRIP_TYPE_CONFIG,
    selectedStates,
    SEASONS,
    DURATIONS,
    season,
    duration,
    setStep,
    handleSearch
}) {
    const styles = CompStyles();

    return (
        <section>
            <h2 style={styles.stepTitle}>Ready to explore?</h2>
            <p style={styles.stepHint}>Here's a summary of your trip preferences</p>

            <div style={styles.summaryGrid}>
                <div style={styles.summaryBlock}>
                    <span style={styles.summaryLabel}>Trip Types</span>
                    <div style={styles.chipRow}>
                        {tripTypes.map((t) => (
                            <span key={t} style={{ ...styles.chip, background: TRIP_TYPE_CONFIG[t].bg, color: TRIP_TYPE_CONFIG[t].color }}>
                                {TRIP_TYPE_CONFIG[t].icon} {TRIP_TYPE_CONFIG[t].label}
                            </span>
                        ))}
                    </div>
                </div>

                <div style={styles.summaryBlock}>
                    <span style={styles.summaryLabel}>
                        Destinations{" "}
                        <span style={{ color: "#aaa", fontWeight: 400 }}>
                            ({selectedStates.length > 0 ? selectedStates.length : "all"})
                        </span>
                    </span>
                    <div style={styles.chipRow}>
                        {selectedStates.length > 0
                            ? selectedStates.map((s) => (
                                <span key={s} style={{ ...styles.chip, background: "#e8f4fd", color: "#0077b6" }}>
                                    📍 {s}
                                </span>
                            ))
                            : <span style={{ color: "#aaa", fontSize: 13 }}>All matched states</span>}
                    </div>
                </div>

                <div style={styles.summaryRow}>
                    <div style={styles.summaryBlock}>
                        <span style={styles.summaryLabel}>Season</span>
                        <span style={styles.summaryValue}>
                            {SEASONS.find((s) => s.id === season)?.icon}{" "}
                            {SEASONS.find((s) => s.id === season)?.label}
                        </span>
                    </div>
                    <div style={styles.summaryBlock}>
                        <span style={styles.summaryLabel}>Duration</span>
                        <span style={styles.summaryValue}>
                            {DURATIONS.find((d) => d.id === duration)?.icon}{" "}
                            {DURATIONS.find((d) => d.id === duration)?.label}
                        </span>
                    </div>
                </div>
            </div>

            <div style={styles.navRow}>
                <button style={styles.backBtn} onClick={() => setStep(3)}>← Back</button>
                <button style={styles.searchBtn} onClick={handleSearch}>
                    <span style={{ fontSize: 20 }}>🔍</span>
                    &nbsp; Search Places
                </button>
            </div>
        </section>
    );
}