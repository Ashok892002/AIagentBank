import React, { useState } from 'react';
import axios from 'axios';
import LoanForm from './LoanForm';

const AgentDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    age: 30,
    monthly_income: 50000,
    annual_income: 600000,
    employment_status: 'Salaried',
    existing_emis: 10000,
    cibil_score: 720,
    loan_type: 'Personal',
    loan_amount: 500000,
    documents_provided: ['Aadhaar', 'PAN', 'Bank Statement', 'ITR']
  });

  const handleProcessLoan = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post('http://localhost:8000/evaluate_loan', formData);
      setResult(response.data);
    } catch (err) {
      setError('Failed to connect to AI Agent Core. Is the FastAPI backend running?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-grid">
      <LoanForm formData={formData} setFormData={setFormData} />
      
      <div className="glass-panel text-center">
        <div className="agent-avatar">
          {/* SVG Robot Icon */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a3 3 0 0 1 3 3v2h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2v2a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-2H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2V10a3 3 0 0 1 3-3h1V5.73A2 2 0 1 1 12 2zm0 2a.5.5 0 0 0-.5.5.5.5 0 0 0 1 0A.5.5 0 0 0 12 4zm3 5H9a1.5 1.5 0 0 0-1.5 1.5V20A1.5 1.5 0 0 0 9 21.5h6a1.5 1.5 0 0 0 1.5-1.5V10.5A1.5 1.5 0 0 0 15 9zm-5.5 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="#38bdf8"/>
          </svg>
        </div>
        
        <h2 className="panel-title" style={{justifyContent: 'center'}}>Aria: AI Decision Core</h2>
        <p style={{color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem'}}>
          Click below to initiate the RAG-based document verification and policy matching engine.
        </p>
        
        <button 
          className="btn-primary" 
          onClick={handleProcessLoan}
          disabled={loading}
          style={{animation: loading ? 'pulse 1.5s infinite' : 'none'}}
        >
          {loading ? (
            <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <span className="loading-spinner"></span> Processing...
            </span>
          ) : (
            'One-Click AI Assessment'
          )}
        </button>

        {error && (
          <div style={{marginTop: '1.5rem', color: 'var(--error)', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--error)'}}>
            {error}
          </div>
        )}

        {result && (
          <div className="results-section" style={{textAlign: 'left'}}>
            <div style={{textAlign: 'center'}}>
              <div className={`status-badge ${result.status.toLowerCase()}`}>
                {result.status}
              </div>
            </div>

            <h3 style={{color: 'var(--text-main)'}}>AI Reasoning:</h3>
            <ul className="results-list">
              {result.reasoning.map((reason, idx) => (
                <li key={idx}>{reason}</li>
              ))}
            </ul>

            <div style={{marginTop: '1rem', padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '0.75rem', border: '1px solid rgba(56, 189, 248, 0.3)'}}>
              <span style={{color: 'var(--primary-glow)', fontWeight: 'bold'}}>Applicable Interest Rate: </span> 
              <span style={{color: 'white'}}>{result.interest_rate}</span>
            </div>

            {result.suggested_alternatives && result.suggested_alternatives.length > 0 && (
              <>
                <h3 style={{marginTop: '1.5rem', color: 'var(--warning)'}}>Suggested Alternatives:</h3>
                <ul className="results-list" style={{color: '#fcd34d'}}>
                  {result.suggested_alternatives.map((alt, idx) => (
                    <li key={idx} style={{color: '#fde68a'}}>{alt}</li>
                  ))}
                </ul>
              </>
            )}

            {result.disbursement_steps && result.disbursement_steps.length > 0 && (
              <>
                <h3 style={{marginTop: '1.5rem', color: 'var(--success)'}}>Disbursement Workflow:</h3>
                <ul className="results-list">
                  {result.disbursement_steps.map((step, idx) => (
                    <li key={idx} style={{color: '#a7f3d0'}}>{step}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDashboard;
