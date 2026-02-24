import { CompStyles } from "@/components_styles/CompStyles";

export default function SeasonSelectionCard({ SEASONS, season, setSeason, setStep }) {
    const styles = CompStyles();

    return (
        <section>
            <h2 style={styles.stepTitle}>When are you planning to visit?</h2>
            <p style={styles.stepHint}>Choose your travel season</p>
            <div style={styles.seasonGrid}>
                {SEASONS.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => setSeason(s.id)}
                        style={{
                            ...styles.seasonCard,
                            background: season === s.id ? "#c9184a" : "#fff",
                            color: season === s.id ? "#fff" : "#333",
                            border: `2px solid ${season === s.id ? "#c9184a" : "#eee"}`,
                            transform: season === s.id ? "translateY(-4px)" : "none",
                            boxShadow: season === s.id
                                ? "0 10px 28px #c9184a44"
                                : "0 2px 8px #0001",
                        }}
                    >
                        <span style={{ fontSize: 32 }}>{s.icon}</span>
                        <span style={{ fontWeight: 700, fontSize: 15, marginTop: 6 }}>
                            {s.label}
                        </span>
                        <span style={{ fontSize: 12, opacity: 0.7 }}>{s.desc}</span>
                    </button>
                ))}
            </div>
            <div style={styles.navRow}>
                <button style={styles.backBtn} onClick={() => setStep(1)}>← Back</button>
                <button
                    style={{
                        ...styles.nextBtn,
                        opacity: season ? 1 : 0.4,
                        cursor: season ? "pointer" : "not-allowed",
                    }}
                    disabled={!season}
                    onClick={() => setStep(3)}
                >
                    Next → Duration
                </button>
            </div>
        </section>
    );
}