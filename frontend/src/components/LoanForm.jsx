import React from 'react';

const LoanForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'employment_status' || name === 'loan_type' ? value : parseFloat(value) || 0
    });
  };

  const handleCheckboxChange = (doc) => {
    const updatedDocs = formData.documents_provided.includes(doc)
      ? formData.documents_provided.filter(d => d !== doc)
      : [...formData.documents_provided, doc];
    
    setFormData({
      ...formData,
      supported_docs: updatedDocs, // Internal use
      documents_provided: updatedDocs
    });
  };

  const docs = ["Aadhaar", "PAN", "Bank Statement", "ITR"];

  return (
    <div className="glass-panel">
      <h2 className="panel-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--primary-glow)'}}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        Application Data
      </h2>

      <div className="dashboard-form">
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
          <div className="form-group">
            <label>Age</label>
            <input 
              type="number" 
              name="age" 
              className="form-control" 
              value={formData.age} 
              onChange={handleChange} 
            />
          </div>
          <div className="form-group">
            <label>CIBIL Score</label>
            <input 
              type="number" 
              name="cibil_score" 
              className="form-control" 
              value={formData.cibil_score} 
              onChange={handleChange} 
            />
          </div>
        </div>

        <div className="form-group">
          <label>Employment Status</label>
          <select 
            name="employment_status" 
            className="form-control" 
            value={formData.employment_status} 
            onChange={handleChange}
          >
            <option value="Salaried">Salaried Professional</option>
            <option value="Self-Employed">Self-Employed / Business</option>
            <option value="Freelancer">Freelancer</option>
          </select>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
          <div className="form-group">
            <label>Monthly Income (₹)</label>
            <input 
              type="number" 
              name="monthly_income" 
              className="form-control" 
              value={formData.monthly_income} 
              onChange={handleChange} 
            />
          </div>
          <div className="form-group">
            <label>Existing EMIs (₹)</label>
            <input 
              type="number" 
              name="existing_emis" 
              className="form-control" 
              value={formData.existing_emis} 
              onChange={handleChange} 
            />
          </div>
        </div>

        <div className="form-group">
          <label>Annual Income (₹)</label>
          <input 
            type="number" 
            name="annual_income" 
            className="form-control" 
            value={formData.annual_income} 
            onChange={handleChange} 
          />
        </div>

        <div style={{borderTop: '1px solid var(--border-color)', margin: '1.5rem 0', paddingTop: '1.5rem'}}>
          <div className="form-group">
            <label>Loan Type</label>
            <select 
              name="loan_type" 
              className="form-control" 
              value={formData.loan_type} 
              onChange={handleChange}
            >
              <option value="Home">Home Loan</option>
              <option value="Personal">Personal Loan</option>
              <option value="Business">Business Loan</option>
              <option value="Vehicle">Vehicle Loan</option>
              <option value="Education">Education Loan</option>
            </select>
          </div>

          <div className="form-group">
            <label>Requested Loan Amount (₹)</label>
            <input 
              type="number" 
              name="loan_amount" 
              className="form-control" 
              value={formData.loan_amount} 
              onChange={handleChange} 
              style={{fontSize: '1.2rem', fontWeight: 'bold', borderLeft: '4px solid var(--primary-glow)'}}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Documents Uploaded</label>
          <div className="checkbox-group">
            {docs.map(doc => (
              <label key={doc} className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={formData.documents_provided.includes(doc)} 
                  onChange={() => handleCheckboxChange(doc)} 
                />
                {doc}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanForm;
