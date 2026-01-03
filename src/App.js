import React, { useState, useEffect } from "react";
import FileUpload from "./components/FileUpload";
import ResultsDisplay from "./components/ResultsDisplay";
import "./App.css";

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiStatus, setApiStatus] = useState(null);
  const [showTips, setShowTips] = useState(false);

  // Check API health on component mount
  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const API_URL = "http://localhost:5000";
        const response = await fetch(`${API_URL}/health`);
        const data = await response.json();
        setApiStatus({
          healthy: true,
          service: data.service,
          aiEnabled: data.ai_available || false
        });
      } catch (err) {
        setApiStatus({
          healthy: false,
          service: "Resume Analyzer",
          aiEnabled: false
        });
        console.log("API health check failed (using local processing)");
      }
    };

    checkApiHealth();
  }, []);

  const handleAnalysisComplete = (data) => {
    setAnalysis(data);
    setError("");
    // Store last analysis in localStorage for persistence
    localStorage.setItem('lastAnalysis', JSON.stringify({
      data: data,
      timestamp: new Date().toISOString()
    }));
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

  // Load last analysis from localStorage on component mount
  useEffect(() => {
    const lastAnalysis = localStorage.getItem('lastAnalysis');
    if (lastAnalysis) {
      const { data, timestamp } = JSON.parse(lastAnalysis);
      // Only load if less than 1 hour old
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      if (new Date(timestamp) > oneHourAgo) {
        setAnalysis(data);
      }
    }
  }, []);

  return (
    <div className="min-vh-100 bg-gradient-primary d-flex align-items-center justify-content-center p-3">
      <div className="w-100 max-w-900 bg-white rounded-4 shadow-xl p-4 p-md-5 position-relative">
        {/* API Status Indicator */}
        {apiStatus && (
          <div className={`api-status-indicator ${apiStatus.healthy ? 'healthy' : 'unhealthy'}`}>
            <span className="status-dot"></span>
            <small className="ms-1">
              {apiStatus.healthy ? 'Connected' : 'Local Mode'}
            </small>
            {apiStatus.aiEnabled && apiStatus.healthy && (
              <small className="ms-2 text-success">
                <i className="bi bi-robot"></i> AI Enabled
              </small>
            )}
          </div>
        )}

        <header className="text-center mb-4">
          <div className="mb-3">
            <i className="bi bi-file-earmark-text-fill display-1 text-primary"></i>
          </div>
          <h1 className="display-6 fw-bold text-dark mb-2">
            Resume Analyzer Pro
          </h1>
          <p className="text-muted mb-2">
            AI-Powered ATS Optimization & Career Guidance
          </p>
          <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
            <span className="badge bg-primary">PDF</span>
            <span className="badge bg-success">DOCX</span>
            <span className="badge bg-info">TXT</span>
            <span className="badge bg-warning">Max 5MB</span>
          </div>
          <button 
            className="btn btn-sm btn-outline-secondary mt-1"
            onClick={() => setShowTips(!showTips)}
          >
            {showTips ? "Hide Tips" : "Show Tips"} <i className={`bi bi-chevron-${showTips ? 'up' : 'down'}`}></i>
          </button>
        </header>

        {/* Tips Section */}
        {showTips && (
          <div className="alert alert-info mb-4">
            <h6 className="fw-bold d-flex align-items-center">
              <i className="bi bi-lightbulb me-2"></i> Pro Tips for Best Results:
            </h6>
            <ul className="mb-0 small">
              <li>Upload PDF or DOCX for best text extraction</li>
              <li>Ensure your resume has clear section headings</li>
              <li>Include quantifiable achievements (numbers, percentages)</li>
              <li>Use industry-specific keywords from job descriptions</li>
              <li>Keep your resume between 300-700 words for optimal length</li>
            </ul>
          </div>
        )}

        <FileUpload
          onAnalysisComplete={handleAnalysisComplete}
          onError={handleError}
          loading={loading}
          setLoading={setLoading}
        />

        {error && (
          <div className="alert alert-danger mt-3 animate-fade-in">
            <div className="d-flex align-items-center">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              <div className="flex-grow-1">
                <strong>Error:</strong> {error}
              </div>
              <button
                onClick={handleReset}
                className="btn btn-sm btn-outline-danger"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center mt-4 py-4">
            <div className="spinner-grow text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">
              Analyzing your resume...
              <br />
              <small>Extracting text and evaluating ATS compatibility</small>
            </p>
          </div>
        )}

        {analysis && !loading && (
          <ResultsDisplay analysis={analysis} onReset={handleReset} />
        )}

        {!analysis && !error && !loading && (
          <div className="mt-4">
            <div className="alert alert-light border">
              <h6 className="fw-bold d-flex align-items-center">
                <i className="bi bi-speedometer2 me-2"></i> How It Works:
              </h6>
              <div className="row mt-3">
                <div className="col-md-3 mb-3">
                  <div className="text-center p-3 bg-primary bg-opacity-10 rounded-3">
                    <i className="bi bi-upload display-6 text-primary mb-2"></i>
                    <h6 className="fw-bold">Upload</h6>
                    <small>Select your resume file</small>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-center p-3 bg-success bg-opacity-10 rounded-3">
                    <i className="bi bi-gear display-6 text-success mb-2"></i>
                    <h6 className="fw-bold">Analyze</h6>
                    <small>AI-powered analysis</small>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-center p-3 bg-warning bg-opacity-10 rounded-3">
                    <i className="bi bi-graph-up display-6 text-warning mb-2"></i>
                    <h6 className="fw-bold">Score</h6>
                    <small>Get ATS compatibility score</small>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="text-center p-3 bg-info bg-opacity-10 rounded-3">
                    <i className="bi bi-lightbulb display-6 text-info mb-2"></i>
                    <h6 className="fw-bold">Improve</h6>
                    <small>Receive actionable tips</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Analysis Preview */}
            <div className="alert alert-secondary mt-3">
              <h6 className="fw-bold">
                <i className="bi bi-eye me-2"></i> What You'll Get:
              </h6>
              <div className="row mt-2">
                <div className="col-md-6">
                  <ul className="small mb-0">
                    <li>✓ ATS Compatibility Score (0-100)</li>
                    <li>✓ Specific Improvement Recommendations</li>
                    <li>✓ Keyword Optimization Tips</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="small mb-0">
                    <li>✓ Formatting Suggestions</li>
                    <li>✓ Content Enhancement Ideas</li>
                    <li>✓ Professional Summary Feedback</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-4 pt-4 border-top text-center">
          <div className="row">
            <div className="col-md-6 mb-3 mb-md-0">
              <p className="text-muted small mb-0">
                <i className="bi bi-shield-check me-1"></i>
                Secure & Private - Files never stored
              </p>
            </div>
            <div className="col-md-6">
              <p className="text-muted small mb-0">
                <i className="bi bi-clock-history me-1"></i>
                Instant Analysis - Results in seconds
              </p>
            </div>
          </div>
          <div className="mt-2">
            <button 
              className="btn btn-sm btn-outline-primary me-2"
              onClick={() => window.open('https://example.com/help', '_blank')}
            >
              <i className="bi bi-question-circle me-1"></i> Help
            </button>
            <button 
              className="btn btn-sm btn-outline-secondary"
              onClick={() => {
                localStorage.removeItem('lastAnalysis');
                handleReset();
              }}
            >
              <i className="bi bi-trash me-1"></i> Clear History
            </button>
          </div>
        </footer>
      </div>

      {/* Stats Banner */}
      {analysis && (
        <div className="stats-banner animate-slide-up">
          <div className="container">
            <div className="row text-center">
              <div className="col-4">
                <small className="text-muted">Score</small>
                <div className="fw-bold text-primary">{analysis.ats_score}/100</div>
              </div>
              <div className="col-4">
                <small className="text-muted">Improvements</small>
                <div className="fw-bold text-warning">{analysis.mandatory_changes?.length || 0}</div>
              </div>
              <div className="col-4">
                <small className="text-muted">Status</small>
                <div className="fw-bold text-success">Complete</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;