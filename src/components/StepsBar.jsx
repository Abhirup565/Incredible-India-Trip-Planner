import { CompStyles } from "../components_styles/CompStyles";

export default function StepsBar({ current, total }) {
    const styles = CompStyles();
    return (
        <>
            <div style={styles.stepBar}>
                {Array.from({ length: total }).map((_, i) => (
                    <div key={i} style={styles.stepItem}>
                        <div
                            style={{
                                ...styles.stepDot,
                                background:
                                    i < current
                                        ? "#e07b39"
                                        : i === current
                                            ? "#c9184a"
                                            : "#e5e5e5",
                                transform: i === current ? "scale(1.3)" : "scale(1)",
                                boxShadow: i === current ? "0 0 0 4px #ffd6e0" : "none",
                            }}
                        />
                        {i < total - 1 && (
                            <div
                                style={{
                                    ...styles.stepLine,
                                    background: i < current ? "#e07b39" : "#e5e5e5",
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div style={styles.stepLabels}>
                {["Trip Type", "Destination", "Season", "Duration", "Search"].map((l, i) => (
                    <span
                        key={i}
                        style={{
                            ...styles.stepLabel,
                            color: i === current ? "#c9184a" : i < current ? "#e07b39" : "#aaa",
                            fontWeight: i === current ? 700 : 400,
                        }}
                    >
                        {l}
                    </span>
                ))}
            </div>
        </>
    );
}