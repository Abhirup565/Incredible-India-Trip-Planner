import { CompStyles } from "@/components_styles/CompStyles";

export default function HeroTitle() {
    const styles = CompStyles();
    return (
        <header style={styles.header}>
            <div style={styles.headerDecor}>✦</div>
            <h1 style={styles.heroTitle}>
                <span style={styles.heroAccent}>Incredible</span>
                <br />
                India Trip Planner
            </h1>
            <p style={styles.heroSub}>
                Discover the soul of India — step by step
            </p>
            <div style={styles.headerDecor}>✦</div>
        </header>
    );
}