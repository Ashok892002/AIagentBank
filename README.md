# NexaBank AI Credit Officer 🏦🤖

A premium, end-to-end AI-powered loan assessment dashboard. This project features a **One-Click AI Agent** that utilizes **RAG (Retrieval-Augmented Generation)** to evaluate loan applications against complex policy documents.

## 🌟 Key Features

- **Agentic Decision Logic**: Automatically assess CIBIL scores, Income-to-Debt ratios (FOIR), and document validity.
- **RAG Integration**: Powered by FAISS and vector embeddings to match applicant data against banking policy knowledge bases.
- **Modern UI/UX**: High-fidelity dashboard built with React and custom glassmorphism CSS.
- **Real-time Feedback**: Instant conditional approval, rejection reasoning, and suggested alternative workflows.
- **FastAPI Core**: High-performance backend handling complex decision trees and RAG retrieval.

## 🛠️ Technology Stack

- **Frontend**: React (Vite), Vanilla CSS, Axios
- **Backend**: FastAPI, Pydantic, Python 3.11+
- **AI/ML**: FAISS (Vector Database), NumPy (Embeddings Simulation)
- **Styling**: Premium custom CSS with dark mode and glassmorphism

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm

### 1. Setup Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
The backend will be available at `http://127.0.0.1:8000`.

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
The dashboard will be available at `http://localhost:5173`.

## 🧠 Decision Engine Logic

The AI Agent follows a strict validation pipeline:
1. **Document Verification**: Checks for Aadhaar, PAN, Bank Statements, and ITR.
2. **FOIR Assessment**: Fixed Obligation to Income Ratio must be below 55%.
3. **CIBIL Score Analysis**:
   - `>700`: Approved
   - `650-699`: Conditional (Requires collateral)
   - `<650`: Rejected
4. **Loan-to-Income Check**: Max loan amount is calculated based on loan type (e.g., Home Loan = 7x Annual Income).

## 📄 Project Structure
```text
AIagentBank/
├── backend/
│   ├── main.py           # FastAPI Routes & Logic
│   ├── rag_engine.py      # FAISS Vector Search
│   └── requirements.txt  # Python Deps
└── frontend/
    ├── src/
    │   ├── components/    # React Widgets
    │   ├── App.jsx        # Root Layout
    │   └── index.css      # Design System
    └── package.json       # Node Deps
```

---
*Developed for AI Credit Officer Technical Assessment.*

## 💬 Interview Quick-Reference

If asked how this works, here are the key talking points:

- **What is the "AI Agent" part?**
  The system acts as an autonomous agent that takes raw applicant data, retrieves relevant banking policies using RAG, and applies a multi-step decision chain (Document Check -> FOIR Assessment -> CIBIL Analysis -> Capacity Check) to reach a final decision without manual intervention.

- **Why use RAG (Retrieval-Augmented Generation)?**
  Instead of hardcoding every bank's changing policies, the agent queries a FAISS vector database. This allows the bank to update interest rates or risk thresholds in the "Policy Documents" without changing a single line of application code.

- **How is the Decision Logic structured?**
  It uses a deterministic decision tree for credit safety (FOIR/CIBIL) combined with semantic retrieval for policy matching, ensuring the decision is both accurate and grounded in actual bank rules.
