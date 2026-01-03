# AI Resume Analyzer 

A professional tool that analyzes resumes for **ATS (Applicant Tracking System)** compatibility and provides clear, actionable improvement suggestions.

---

## What It Does
- Upload resumes in **PDF, DOCX, or TXT**
- Generates an **ATS compatibility score (0–100)**
- Provides **specific improvement suggestions**
- Helps optimize resumes for better job applications

---

## Live URLs
- **Frontend:** https://ai-resume-analyzer.vercel.app  
- **Backend:** https://resume-analyzer-ai.onrender.com  

---

## Repository URLs
- **Frontend Code:** https://github.com/karthi1953/ai-resume-analyzer  
- **Backend Code:** https://github.com/karthi1953/ai-resume-analyzer-backend  

---

## Project Structure

### Frontend (React)
- `App.js` – Main application component, UI state & API calls  
- `App.css` – Global styles and animations  
- `components/FileUpload.js` – Resume upload & validation  
- `components/ResultsDisplay.js` – Displays analysis results  
- `components/ScoreCard.js` – Color‑coded ATS score  
- `.env` – Environment configuration  

### Backend (Node.js + Express)
- `index.js` – Server setup and routing  
- `routes/analyze.js` – Resume analysis API endpoint  
- `utils/atsScorer.js` – Core ATS scoring logic
- `utils/fileParser.js` – Text extraction from PDF/DOCX/TXT  
- `middleware/errorHandler.js` – Global error handling  

---

## 🚀 Quick Start
1. Open the frontend URL  
2. Upload your resume  
3. Get instant ATS score and suggestions  
4. Improve your resume based on the feedback  

---

## 🎯 Why This Project
This project focuses on solving a real‑world problem—**getting resumes past ATS filters**—by combining frontend usability with backend text analysis and scoring logic.

---

Built using React and Express.
