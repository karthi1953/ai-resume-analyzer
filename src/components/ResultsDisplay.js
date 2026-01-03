import React from "react";
import { motion } from "framer-motion";
import ScoreCard from "./ScoreCard";

const ResultsDisplay = ({ analysis, onReset }) => {
    if (!analysis || !analysis.mandatory_changes) {
        return (
          <div className="alert alert-warning mt-4">
            <h4>Analysis Data Incomplete</h4>
            <p>Unable to display recommendations. Please try again.</p>
            <button onClick={onReset} className="btn btn-primary">
              Try Again
            </button>
          </div>
        );
      }
      

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
{analysis.insights && analysis.insights.length > 0 && (
  <div className="mb-4">
    <h3 className="h4 fw-bold text-info mb-3">
      <i className="bi bi-bar-chart me-2"></i> ATS Insights
    </h3>
    <div className="row g-2">
      {analysis.insights.map((insight, index) => (
        <div key={index} className="col-12">
          <div className="p-3 bg-info bg-opacity-10 border-start border-3 border-info rounded-end">
            <p className="mb-0">{insight}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{analysis.metrics && (
  <div className="mb-4">
    <h3 className="h4 fw-bold text-dark mb-3">
      <i className="bi bi-speedometer2 me-2"></i> Performance Metrics
    </h3>
    <div className="row g-3 text-center">
      <div className="col-3">
        <div className="p-3 bg-light rounded-3">
          <div className="fw-bold text-primary">{analysis.metrics.keyword_density || 0}</div>
          <small className="text-muted">Keywords</small>
        </div>
      </div>
      <div className="col-3">
        <div className="p-3 bg-light rounded-3">
          <div className="fw-bold text-success">{analysis.metrics.achievement_count || 0}</div>
          <small className="text-muted">Quantifiable Achievements</small>
        </div>
      </div>
      <div className="col-3">
        <div className="p-3 bg-light rounded-3">
          <div className="fw-bold text-warning">{analysis.metrics.action_verb_count || 0}</div>
          <small className="text-muted">Action Verbs</small>
        </div>
      </div>
      <div className="col-3">
        <div className="p-3 bg-light rounded-3">
          <div className="fw-bold text-info">{analysis.metrics.section_count || 0}</div>
          <small className="text-muted">Sections</small>
        </div>
      </div>
    </div>
  </div>
)}
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