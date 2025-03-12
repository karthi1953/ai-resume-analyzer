import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./App.css"; // Optional custom CSS for additional styling

function App() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a file first!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await axios.post("http://localhost:5000/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Backend Response:", response.data); // Debugging

      // Set the analysis data
      setAnalysis(response.data.analysis);
    } catch (err) {
      console.error("Frontend Error:", err);
      setError(
        err.response?.data?.error ||
        err.message ||
        "Failed to analyze resume. Check the console for details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center p-4">
      <motion.div
        className="w-100 max-w-800 bg-white rounded-4 shadow-lg p-5"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-center display-4 fw-bold text-primary mb-5">
          Quick AI Resume Analyzer
        </h1>
        <h6 className="text-center text-success">
  <a 
    href="https://github.com/karthi1953" 
    style={{ textDecoration: "none", color: "inherit" }}
  >
    Karthik's project
  </a>
</h6>
        <h6 className="text-center">Reload the Page if error occurs</h6>

        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.docx,.txt"
            className="form-control form-control-lg"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-100 btn btn-primary btn-lg fw-bold"
        >
          {loading ? (
            <div className="d-flex align-items-center justify-content-center">
              <div className="spinner-border spinner-border-sm me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              Analyzing...
            </div>
          ) : (
            "Analyze Resume"
          )}
        </button>

        <AnimatePresence>
          {error && (
            <motion.div
              className="mt-4 alert alert-danger"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {analysis && (
            <motion.div
              className="mt-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <h2 className="text-center display-5 fw-bold text-dark mb-4">
                Analysis Results
              </h2>

              <div className="p-4 bg-primary bg-opacity-10 rounded-3 mb-4">
                <h3 className="h4 fw-bold text-primary">ATS Score</h3>
                <p className="display-3 fw-bold text-primary">
                  {analysis.ats_score}
                </p>
              </div>

              <div>
                <h3 className="h4 fw-bold text-dark mb-3">Suggestions</h3>
                <ul className="list-unstyled">
                  {analysis.mandatory_changes.map((change, index) => (
                    <motion.li
                      key={index}
                      className="p-3 mb-3 bg-white border rounded-3 shadow-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <strong className="text-primary">{change.field}:</strong>{" "}
                      <span className="text-dark">{change.description}</span>
                    </motion.li>
                  ))}
                </ul>

              </div>
              
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;