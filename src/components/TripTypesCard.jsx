import { CompStyles } from "@/components_styles/CompStyles";

export default function TripTypesCard({ TRIP_TYPE_CONFIG, toggleTripType, tripTypes, setStep }) {
    const styles = CompStyles();
    return (
        <section>
            <h2 style={styles.stepTitle}>What kind of trip are you looking for?</h2>
            <p style={styles.stepHint}>Select one or more types</p>
            <div style={styles.tileGrid}>
                {Object.entries(TRIP_TYPE_CONFIG).map(([id, cfg]) => {
                    const active = tripTypes.includes(id);
                    return (
                        <button
                            key={id}
                            onClick={() => toggleTripType(id)}
                            style={{
                                ...styles.tile,
                                background: active ? cfg.color : "#fff",
                                color: active ? "#fff" : cfg.color,
                                border: `2px solid ${cfg.color}`,
                                transform: active ? "scale(1.05)" : "scale(1)",
                                boxShadow: active
                                    ? `0 8px 24px ${cfg.color}44`
                                    : "0 2px 8px #0001",
                            }}
                        >
                            <span style={styles.tileIcon}>{cfg.icon}</span>
                            <span style={styles.tileLabel}>{cfg.label}</span>
                            {active && <span style={styles.tileCheck}>✓</span>}
                        </button>
                    );
                })}
            </div>
            <div style={styles.navRow}>
                <span />
                <button
                    style={{
                        ...styles.nextBtn,
                        opacity: tripTypes.length ? 1 : 0.4,
                        cursor: tripTypes.length ? "pointer" : "not-allowed",
                    }}
                    disabled={!tripTypes.length}
                    onClick={() => setStep(1)}
                >
                    Next → Destination
                </button>
            </div>
        </section>
    );
}