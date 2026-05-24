import { CompStyles } from "../components_styles/CompStyles";

export default function Mandala() {
    const styles = CompStyles();
    return (
        <>
            <svg
                className="hide-on-mobile"
                viewBox="0 0 400 400"
                style={styles.mandala1}
                xmlns="http://www.w3.org/2000/svg"
                overflow="visible"
            >
                {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map((deg) => (
                    <g key={deg} transform={`rotate(${deg} 200 200)`}>
                        <ellipse cx="200" cy="65" rx="14" ry="55" fill="none" stroke="pink" strokeWidth="2" />
                        <ellipse cx="200" cy="40" rx="20" ry="80" fill="none" stroke="pink" strokeWidth="2" />
                        <ellipse cx="200" cy="210" rx="14" ry="45" fill="none" stroke="pink" strokeWidth="2" />
                        <circle cx="200" cy="30" r="5" fill="orange" />
                    </g>
                ))}
                <circle cx="200" cy="200" r="40" fill="none" stroke="skyblue" strokeWidth="2" />
                <circle cx="200" cy="200" r="60" fill="none" stroke="green" strokeWidth="2" />
                <circle cx="200" cy="200" r="75" fill="none" stroke="white" strokeWidth="10" />
                <circle cx="200" cy="200" r="90" fill="none" stroke="orange" strokeWidth="2" />
                <style>{`@keyframes rotateAnticlock { to { transform: rotate(-360deg); } }`}</style>
            </svg>
            <svg
                className="hide-on-mobile"
                viewBox="0 0 400 400"
                style={styles.mandala2}
                xmlns="http://www.w3.org/2000/svg"
                overflow="visible"
            >
                {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map((deg) => (
                    <g key={deg} transform={`rotate(${deg} 200 200)`}>
                        <ellipse cx="200" cy="65" rx="14" ry="55" fill="none" stroke="pink" strokeWidth="2" />
                        <ellipse cx="200" cy="40" rx="20" ry="80" fill="none" stroke="pink" strokeWidth="2" />
                        <ellipse cx="200" cy="210" rx="14" ry="45" fill="none" stroke="pink" strokeWidth="2" />
                        <circle cx="200" cy="30" r="5" fill="orange" />
                    </g>
                ))}
                <circle cx="200" cy="200" r="40" fill="none" stroke="skyblue" strokeWidth="2" />
                <circle cx="200" cy="200" r="60" fill="none" stroke="green" strokeWidth="2" />
                <circle cx="200" cy="200" r="75" fill="none" stroke="white" strokeWidth="10" />
                <circle cx="200" cy="200" r="90" fill="none" stroke="orange" strokeWidth="2" />
                <style>{`@keyframes rotateClock { to { transform: rotate(360deg); } }`}</style>
            </svg>
        </>
    );
}