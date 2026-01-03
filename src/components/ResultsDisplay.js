import React from "react";
import { motion } from "framer-motion";
import ScoreCard from "./ScoreCard";

const ResultsDisplay = ({ analysis, onReset }) => {
  return (
    <motion.div
      className="mt-4 pt-4 border-top"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark mb-0">
          Analysis Results
        </h2>
        <button
          onClick={onReset}
          className="btn btn-sm btn-outline-secondary"
        >
          New Analysis
        </button>
      </div>

      <ScoreCard score={analysis.ats_score} summary={analysis.summary} />

      <div className="mb-4">
        <h3 className="h4 fw-bold text-dark mb-3">
          Recommendations
        </h3>
        <div className="row g-3">
          {analysis.mandatory_changes.map((change, index) => (
            <div key={index} className="col-12">
              <motion.div
                className="p-3 bg-white border-start border-4 border-primary rounded-end shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h6 className="fw-bold text-primary mb-1">
                  {change.field}
                </h6>
                <p className="mb-0 text-dark">
                  {change.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onReset}
          className="btn btn-primary me-2"
        >
          Analyze Another Resume
        </button>
        <button
          onClick={() => window.print()}
          className="btn btn-outline-secondary"
        >
          Print Results
        </button>
      </div>
    </motion.div>
  );
};

export default ResultsDisplay;