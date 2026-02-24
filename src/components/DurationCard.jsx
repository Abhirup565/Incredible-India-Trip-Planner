import { CompStyles } from "@/components_styles/CompStyles";

export default function DurationCard({ DURATIONS, duration, setDuration, setStep }) {
    const styles = CompStyles();
    return (
        <section>
            <h2 style={styles.stepTitle}>How long is your trip?</h2>
            <p style={styles.stepHint}>Pick a duration that suits your schedule</p>
            <div style={styles.seasonGrid}>
                {DURATIONS.map((d) => (
                    <button
                        key={d.id}
                        onClick={() => setDuration(d.id)}
                        style={{
                            ...styles.seasonCard,
                            background: duration === d.id ? "#e07b39" : "#fff",
                            color: duration === d.id ? "#fff" : "#333",
                            border: `2px solid ${duration === d.id ? "#e07b39" : "#eee"}`,
                            transform: duration === d.id ? "translateY(-4px)" : "none",
                            boxShadow: duration === d.id
                                ? "0 10px 28px #e07b3944"
                                : "0 2px 8px #0001",
                        }}
                    >
                        <span style={{ fontSize: 32 }}>{d.icon}</span>
                        <span style={{ fontWeight: 700, fontSize: 15, marginTop: 6 }}>
                            {d.label}
                        </span>
                        <span style={{ fontSize: 12, opacity: 0.7 }}>{d.desc}</span>
                    </button>
                ))}
            </div>
            <div style={styles.navRow}>
                <button style={styles.backBtn} onClick={() => setStep(2)}>← Back</button>
                <button
                    style={{
                        ...styles.nextBtn,
                        opacity: duration ? 1 : 0.4,
                        cursor: duration ? "pointer" : "not-allowed",
                    }}
                    disabled={!duration}
                    onClick={() => setStep(4)}
                >
                    Next → Review
                </button>
            </div>
        </section>
    );
}