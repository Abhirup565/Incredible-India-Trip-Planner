import { CompStyles } from "@/components_styles/CompStyles";

export default function DoneCard({ tripTypes, TRIP_TYPE_CONFIG, resetAll }) {
    const styles = CompStyles();

    return (
        <div style={styles.doneCard}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
            <h2 style={styles.doneTitle}>Your Journey Awaits!</h2>
            <p style={styles.doneSub}>
                We've logged your preferences. Check the console for the full JSON
                payload.
            </p>
            <div style={styles.doneChips}>
                {tripTypes.map((t) => (
                    <span key={t} style={{ ...styles.chip, background: TRIP_TYPE_CONFIG[t].bg, color: TRIP_TYPE_CONFIG[t].color }}>
                        {TRIP_TYPE_CONFIG[t].icon} {TRIP_TYPE_CONFIG[t].label}
                    </span>
                ))}
            </div>
            <button style={styles.resetBtn} onClick={resetAll}>
                ✦ Plan Another Trip
            </button>
        </div>
    );
}