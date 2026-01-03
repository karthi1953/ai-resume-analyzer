import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import ResultsDisplay from "./components/ResultsDisplay";
import "./App.css";

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalysisComplete = (data) => {
    setAnalysis(data);
    setError("");
  };

  const handleError = (errorMsg) => {
    setError(errorMsg);
    setAnalysis(null);
  };

  const handleReset = () => {
    setAnalysis(null);
    setError("");
    setLoading(false);
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center p-3">
      <div className="w-100 max-w-800 bg-white rounded-4 shadow-lg p-4 p-md-5">
        <header className="text-center mb-4">
          <h1 className="display-5 fw-bold text-primary mb-2">
            Resume Analyzer
          </h1>
          <p className="text-muted mb-0">
            Get instant ATS score and improvements
          </p>
          <small className="text-muted">
            Supports: PDF, DOCX, TXT • Max 5MB
          </small>
        </header>

        <FileUpload
          onAnalysisComplete={handleAnalysisComplete}
          onError={handleError}
          loading={loading}
          setLoading={setLoading}
        />

        {error && (
          <div className="alert alert-danger mt-3">
            <strong>Error:</strong> {error}
            <button
              onClick={handleReset}
              className="btn btn-sm btn-danger float-end"
            >
              Try Again
            </button>
          </div>
        )}

        {analysis && (
          <ResultsDisplay analysis={analysis} onReset={handleReset} />
        )}

        {!analysis && !error && (
          <div className="alert alert-light mt-3">
            <h6 className="fw-bold">How it works:</h6>
            <ol className="mb-0 small">
              <li>Upload your resume (PDF, DOCX, or TXT)</li>
              <li>Get instant ATS compatibility score</li>
              <li>Receive specific improvement suggestions</li>
              <li>Optimize your resume for better results</li>
            </ol>
          </div>
        )}

        <footer className="mt-4 pt-4 border-top text-center">
          <p className="text-muted small mb-0">
            Files are processed immediately and never stored
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;