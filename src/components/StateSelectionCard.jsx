import { useEffect, useMemo, useRef } from "react";
import { CompStyles } from "@/components_styles/CompStyles";

export default function StateSelectionCard({
    step,
    setStep,
    toggleState,
    availableStates,
    stateQuery,
    setStateQuery,
    selectedStates,
    setSelectedStates
}) {

    const styles = CompStyles();
    const searchRef = useRef(null);

    // Auto-focus search when entering step 1
    useEffect(() => {
        if (step === 1 && searchRef.current) searchRef.current.focus();
    }, [step]);

    // Remove any selected states that are no longer in available list
    useEffect(() => {
        setSelectedStates((prev) => prev.filter((s) => availableStates.includes(s)));
    }, [availableStates]);

    // Filtered by search query
    const filteredStates = useMemo(() =>
        availableStates.filter((s) =>
            s.toLowerCase().includes(stateQuery.toLowerCase())

        ), [availableStates, stateQuery]
    );

    return (
        <section>
            <h2 style={styles.stepTitle}>Which states interest you?</h2>
            <p style={styles.stepHint}>
                {availableStates.length} states matched · select any
            </p>
            <input
                ref={searchRef}
                style={styles.searchInput}
                placeholder="🔍  Search states…"
                value={stateQuery}
                onChange={(e) => setStateQuery(e.target.value)}
            />
            <div style={styles.stateGrid}>
                {filteredStates.map((name) => {
                    const active = selectedStates.includes(name);
                    return (
                        <button
                            key={name}
                            onClick={() => toggleState(name)}
                            style={{
                                ...styles.stateChip,
                                background: active ? "#c9184a" : "#fff",
                                color: active ? "#fff" : "#333",
                                border: `1.5px solid ${active ? "#c9184a" : "#ddd"}`,
                                fontWeight: active ? 600 : 400,
                            }}
                        >
                            {active && "✓ "}
                            {name}
                        </button>
                    );
                })}
                {filteredStates.length === 0 && (
                    <p style={{ color: "#aaa", fontSize: 14, gridColumn: "1/-1" }}>
                        No states found for "{stateQuery}"
                    </p>
                )}
            </div>
            <div style={styles.navRow}>
                <button style={styles.backBtn} onClick={() => setStep(0)}>
                    ← Back
                </button>
                <button style={styles.nextBtn} onClick={() => setStep(2)}>
                    Next → Season
                </button>
            </div>
        </section>
    )
}