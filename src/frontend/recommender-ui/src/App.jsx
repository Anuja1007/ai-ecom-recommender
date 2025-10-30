import React, { useState } from 'react';
import './App.css';

const API_BASE_URL = "http://localhost:8000";

function App() {
  const [userId, setUserId] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {
    if (!userId || isNaN(parseInt(userId))) {
      setError("Please enter a valid numeric User ID.");
      return;
    }

    setLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const url = `${API_BASE_URL}/recommend/${userId}?n_recommendations=5`;
      const response = await fetch(url);

      if (response.status === 404) {
        setError(`User ID ${userId} not found. Try user IDs: 1, 200, or 500`);
        setRecommendations([]);
      } else if (response.status === 503) {
        setError("API Service Unavailable: Model failed to load.");
      } else if (!response.ok) {
        throw new Error(`API failed with status ${response.status}`);
      } else {
        const data = await response.json();
        setRecommendations(data);
      }
    } catch (err) {
      setError(`Failed to connect: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      fetchRecommendations();
    }
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <header className="header">
          <div className="icon-wrapper">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </div>
          <h1>AI Product Recommender</h1>
          <p className="subtitle">Get personalized product recommendations powered by machine learning</p>
        </header>

        <div className="search-section">
          <div className="input-wrapper">
            <input
              type="number"
              placeholder="Enter User ID (e.g., 1, 200, 500)"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              className="user-input"
            />
            <button
              onClick={fetchRecommendations}
              disabled={loading}
              className={`search-button ${loading ? 'loading' : ''}`}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Analyzing...
                </>
              ) : (
                'Get Recommendations'
              )}
            </button>
          </div>

          <p className="hint">Try user IDs: 1, 200, or 500</p>
        </div>

        {error && (
          <div className="error-message">
            <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>{error}</span>
          </div>
        )}

        {recommendations && recommendations.length > 0 && (
          <div className="results-section">
            <h2 className="results-title">Top {recommendations.length} Recommendations</h2>

            <div className="products-grid">
              {recommendations.map((item, index) => (
                <div key={index} className="product-card">
                  <div className="product-rank">{index + 1}</div>
                  <div className="product-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <path d="M21 15l-5-5L5 21"/>
                    </svg>
                  </div>
                  <div className="product-details">
                    <h3>Product #{item}</h3>
                    <p className="product-meta">ID: {item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {recommendations && recommendations.length === 0 && (
          <div className="empty-state">
            <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
              <line x1="9" y1="9" x2="9.01" y2="9"/>
              <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
            <h3>No recommendations found</h3>
            <p>Try a different user ID</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;