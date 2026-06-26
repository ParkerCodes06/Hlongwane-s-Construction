import { useReducer, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { serviceConfig, services, calculateEstimate } from "../data/pricing";
import QuoteForm from "../components/QuoteForm";
import EstimateResult from "../components/EstimateResult";
import LeadCapture from "../components/LeadCapture";

const steps = ["Service", "Details", "Estimate", "Contact"];

const initialState = {
  step: 1,
  service: null,
  inputs: {},
  estimate: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SELECT_SERVICE":
      return { ...state, step: 2, service: action.payload, inputs: {}, estimate: null };
    case "SUBMIT_INPUTS":
      return { ...state, step: 3, inputs: action.payload };
    case "CALCULATE": {
      const estimate = calculateEstimate(state.service, action.payload);
      return { ...state, estimate };
    }
    case "GO_TO":
      return { ...state, step: action.payload };
    case "GO_BACK":
      return { ...state, step: Math.max(1, state.step - 1) };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

export default function Quote() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const config = state.service ? serviceConfig[state.service] : null;
  const serviceLabel = config?.label || "";
  const sectionRef = useRef(null);

  useEffect(() => {
    if (state.step > 1 && sectionRef.current) {
      const y = sectionRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [state.step]);

  const handleSelectService = useCallback((slug) => {
    dispatch({ type: "SELECT_SERVICE", payload: slug });
  }, []);

  const handleSubmitInputs = useCallback(
    (values) => {
      dispatch({ type: "SUBMIT_INPUTS", payload: values });
      dispatch({ type: "CALCULATE", payload: values });
    },
    []
  );

  const handleBack = useCallback(() => {
    dispatch({ type: "GO_BACK" });
  }, []);

  const handleContinueToContact = useCallback(() => {
    dispatch({ type: "GO_TO", payload: 4 });
  }, []);

  const handleSubmitLead = useCallback((data) => {
    console.log("Lead submitted:", data);
  }, []);

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Get a Quote</span>
          <h1>Instant Project Estimate</h1>
        </div>
      </section>

      <section className="section" ref={sectionRef}>
        <div className="container-narrow">
          <div className="step-indicator">
            {steps.map((label, i) => {
              const idx = i + 1;
              const current = state.step === idx;
              const done = state.step > idx;
              return (
                <div
                  key={label}
                  className={`step-dot${current ? " current" : ""}${done ? " done" : ""}`}
                >
                  <span className="step-num">{done ? "✓" : idx}</span>
                  <span className="step-label">{label}</span>
                </div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {state.step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <div className="quote-intro">
                  <h2>What service do you need?</h2>
                  <p>
                    Select a service to get an instant estimate based on current
                    Gauteng market rates.
                  </p>
                </div>
                <div className="service-select-grid">
                  {services.map((s) => (
                    <button
                      key={s.slug}
                      className="service-select-card"
                      onClick={() => handleSelectService(s.slug)}
                    >
                      <h3>{s.label}</h3>
                      <p>{s.description}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {state.step === 2 && config && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <div className="quote-intro">
                  <h2>{config.label} Details</h2>
                  <p>{config.description}</p>
                </div>
                <QuoteForm
                  config={config}
                  initialValues={state.inputs}
                  onSubmit={handleSubmitInputs}
                  onBack={handleBack}
                />
              </motion.div>
            )}

            {state.step === 3 && state.estimate && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <EstimateResult
                  estimate={state.estimate}
                  serviceLabel={serviceLabel}
                  onBack={handleBack}
                  onContinue={handleContinueToContact}
                />
              </motion.div>
            )}

            {state.step === 4 && state.estimate && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <LeadCapture
                  estimate={state.estimate}
                  serviceLabel={serviceLabel}
                  onBack={handleBack}
                  onSubmit={handleSubmitLead}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {state.step > 1 && (
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <button className="btn-ghost" onClick={handleReset}>
                Start Over
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
