import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const FileUpload = ({ onAnalysisComplete, onError, loading, setLoading }) => {
  const [fileName, setFileName] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate
    const allowedTypes = ['.pdf', '.docx', '.txt'];
    const fileExt = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    if (!allowedTypes.includes(fileExt)) {
      onError("Please select a PDF, DOCX, or TXT file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      onError("File is too large (max 5MB)");
      return;
    }

    setFileName(file.name);
    setIsExtracting(true);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await axios.post(
        `${API_URL}/api/analyze`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 30000,
        }
      );

      if (response.data.success) {
        onAnalysisComplete(response.data.analysis);
      } else {
        throw new Error(response.data.message || "Analysis failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      
      let errorMsg = "Failed to analyze resume";
      if (err.response?.status === 400) {
        errorMsg = err.response.data.message || "Invalid file format";
      } else if (!err.response) {
        errorMsg = "Cannot connect to server";
      }
      
      onError(errorMsg);
    } finally {
      setIsExtracting(false);
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="mb-3">
        <label className="form-label fw-semibold">
          Upload Your Resume
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.docx,.txt"
          className="form-control form-control-lg"
          disabled={loading || isExtracting}
        />
      </div>
      
      {fileName && (
        <motion.div
          className={`alert ${
            isExtracting ? 'alert-warning' : 
            loading ? 'alert-info' : 'alert-success'
          } py-2`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              {isExtracting || loading ? (
                <div className="spinner-grow spinner-grow-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <span>✓</span>
              )}
            </div>
            <div className="flex-grow-1 ms-3">
              <small className="d-block fw-medium">{fileName}</small>
              <small className="d-block">
                {isExtracting ? "Extracting text..." :
                 loading ? "Analyzing..." :
                 "Ready"}
              </small>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FileUpload;