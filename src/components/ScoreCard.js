import React from "react";

const ScoreCard = ({ score, summary }) => {
  const getScoreColor = (score) => {
    if (score >= 85) return "success";
    if (score >= 70) return "primary";
    if (score >= 60) return "warning";
    return "danger";
  };

  const getScoreText = (score) => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 60) return "Fair";
    return "Needs Work";
  };

  return (
    <div className={`p-4 bg-${getScoreColor(score)} bg-opacity-10 rounded-4 mb-4`}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3 className="h4 fw-bold text-dark mb-0">ATS Score</h3>
        <span className={`badge bg-${getScoreColor(score)}`}>
          {getScoreText(score)}
        </span>
      </div>
      <div className="d-flex align-items-end">
        <p className="display-1 fw-bold text-dark mb-0 me-3">
          {score}
        </p>
        <p className="text-muted mb-2">/100</p>
      </div>
      {summary && (
        <p className="text-dark mb-0 mt-2">
          {summary}
        </p>
      )}
    </div>
  );
};

export default ScoreCard;