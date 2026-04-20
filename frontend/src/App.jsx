import React from 'react';
import AgentDashboard from './components/AgentDashboard';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '3rem',
        padding: '1rem 0',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            background: 'linear-gradient(135deg, var(--primary-glow), var(--secondary-glow))',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </div>
          <span style={{ 
            fontSize: '1.5rem', 
            fontWeight: '800', 
            letterSpacing: '-0.02em',
            background: 'linear-gradient(90deg, #fff, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            NexaBank<span style={{ color: 'var(--primary-glow)', WebkitTextFillColor: 'var(--primary-glow)' }}>AI</span>
          </span>
        </div>
        
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <a href="#" style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>Dashboard</a>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>Policies</a>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>Analytics</a>
        </nav>

        <div style={{ 
          padding: '0.5rem 1rem', 
          borderRadius: '2rem', 
          background: 'rgba(56, 189, 248, 0.1)', 
          border: '1px solid rgba(56, 189, 248, 0.2)',
          fontSize: '0.8rem',
          color: 'var(--primary-glow)',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }}></span>
          System Online
        </div>
      </header>

      <main>
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h1 className="title">Intelligent Credit Officer</h1>
          <p className="subtitle">Next-generation loan processing powered by RAG and Agentic Decision Logic.</p>
        </div>

        <AgentDashboard />
      </main>

      <footer style={{ 
        marginTop: '5rem', 
        padding: '2rem 0', 
        textAlign: 'center', 
        borderTop: '1px solid var(--border-color)',
        color: 'var(--text-muted)',
        fontSize: '0.85rem'
      }}>
        <p>© 2026 NexaBank Systems Group. Enterprise Grade AI Lending Solutions.</p>
        <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <span>Privacy Policy</span>
          <span>Security Audit</span>
          <span>API Documentation</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
