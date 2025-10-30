// /src/frontend/recommender-ui/src/App.jsx

import React, { useState } from 'react';
import './App.css'; // Keep standard React styling if desired

// 1. ***CRITICAL: REPLACE WITH YOUR ACTUAL LIVE RENDER URL***
// Example: https://recommender-api-1234.onrender.com
const API_BASE_URL = "https://ai-ecom-recommender.onrender.com/"; 

async function App() {
  const [userId, setUserId] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const fetchRecommendations = async () => {
  // --- TEMPORARY MOCK FOR SCREENSHOT ---
  setLoading(true);
  setError(null);

  // Simulate success after a short delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  setRecommendations([102, 45, 88, 11, 23]); // Mock Data
  setLoading(false);
  // --- END MOCK ---
};
    setLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      // 2. Construct the URL to call the deployed API endpoint
      const url = `${API_BASE_URL}/recommend/${userId}?n_recommendations=5`;
      const response = await fetch(url);
      
      // 3. Handle API Responses (Error Handling is key for Software Engineering)
      if (response.status === 404) {
        // Handled by the backend logic for non-existent users
        setError(`User ID ${userId} not found in model data.`);
        setRecommendations([]);
      } else if (response.status === 503) {
        // Handled if the model failed to load during backend startup
        setError("API Service Unavailable: Model failed to load.");
      } else if (!response.ok) {
        throw new Error(`API failed with status ${response.status}`);
      } else {
        // Success: Parse the JSON list of product IDs
        const data = await response.json();
        setRecommendations(data);
      }
    } catch (err) {
      // Handles network errors (e.g., DNS resolution, CORS issues)
      setError(`Failed to connect or fetch data: ${err.message}. Check browser console.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>🛒 AI Product Recommender </h1>
      <p>Project 1: Full-Stack ML/DevOps Integration Demo</p>
      
      <div className="input-group">
        <input
          type="number"
          placeholder="Enter User ID (e.g., 1)"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          disabled={loading}
          style={{ padding: '10px', marginRight: '10px', minWidth: '200px' }}
        />
        <button 
          onClick={fetchRecommendations} 
          disabled={loading}
          style={{ padding: '10px', cursor: 'pointer' }}
        >
          {loading ? 'Analyzing...' : 'Get Recommendations'}
        </button>
      </div>

      {error && <p style={{ color: 'red', marginTop: '15px' }}>🚨 **Error:** {error}</p>}

      {recommendations && (
        <div className="results-panel" style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '15px' }}>
          <h2>{recommendations.length > 0 ? 'Top 5 Recommendations:' : 'No Recommendations Found'}</h2>
          
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {recommendations.map((item, index) => (
              <li key={index} style={{ background: '#f0f0f0', margin: '5px', padding: '5px' }}>
                Product ID: **{item}**
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );


export default App;