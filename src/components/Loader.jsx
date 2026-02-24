import { CompStyles } from "../components_styles/CompStyles";

function Loader() {
    const styles = CompStyles();
    return (
        <div style={styles.loaderOverlay}>
            <div style={styles.loaderCard}>
                <div style={styles.spinnerRing}>
                    <div style={{ ...styles.ringSegment, ...styles.ring1 }} />
                    <div style={{ ...styles.ringSegment, ...styles.ring2 }} />
                    <div style={{ ...styles.ringSegment, ...styles.ring3 }} />
                    <span style={styles.loaderEmoji}>✈️</span>
                </div>
                <p style={styles.loaderTitle}>Discovering Places…</p>
                <p style={styles.loaderSub}>Curating the best of Incredible India for you</p>
                <div style={styles.progressTrack}>
                    <div style={styles.progressBar} />
                </div>
            </div>
            <style>{`
        @keyframes spin1 { to { transform: rotate(360deg); } }
        @keyframes spin2 { to { transform: rotate(-360deg); } }
        @keyframes spin3 { to { transform: rotate(270deg); } }
        @keyframes progressAnim {
          0%   { width: 0%; }
          60%  { width: 80%; }
          100% { width: 100%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
        </div>
    );
}
export default Loader;