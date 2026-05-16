import React, { useState, useEffect } from 'react';
import { firstAidAPI } from '../../services/api';
import Header from '../Layout/Header';
import './FirstAid.css';

function FirstAid({ user, onLogout }) {
  const [tips, setTips] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTip, setSelectedTip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
    loadTips();
  }, []);

  useEffect(() => {
    loadTips();
  }, [selectedCategory]);

  const loadCategories = async () => {
    try {
      const response = await firstAidAPI.getCategories();
      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error('Load categories error:', error);
    }
  };

  const loadTips = async () => {
    try {
      setLoading(true);
      const response = await firstAidAPI.getTips(selectedCategory || null);
      if (response.data.success) {
        setTips(response.data.tips);
      }
    } catch (error) {
      console.error('Load tips error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTipClick = (tip) => {
    setSelectedTip(tip);
  };

  const closeModal = () => {
    setSelectedTip(null);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Cardiac': 'fa-heartbeat',
      'Bleeding': 'fa-tint',
      'Choking': 'fa-lungs',
      'Burns': 'fa-fire',
      'Fractures': 'fa-bone',
      'Poisoning': 'fa-skull-crossbones',
    };
    return icons[category] || 'fa-first-aid';
  };

  return (
    <div className="firstaid-page">
      <Header user={user} onLogout={onLogout} />
      
      <div className="container">
        <div className="page-header">
          <h2>
            <i className="fas fa-first-aid"></i> First Aid Guide
          </h2>
          <p>Emergency response instructions and life-saving tips</p>
        </div>

        <div className="filter-bar">
          <label>Filter by Category:</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="loading">Loading first aid tips...</div>
        ) : tips.length === 0 ? (
          <div className="card">
            <p className="text-muted">No first aid tips found.</p>
          </div>
        ) : (
          <div className="tips-grid">
            {tips.map((tip) => (
              <div key={tip.id} className="tip-card" onClick={() => handleTipClick(tip)}>
                <div className="tip-icon">
                  <i className={`fas ${getCategoryIcon(tip.category)}`}></i>
                </div>
                <div className="tip-content">
                  <span className="tip-category">{tip.category}</span>
                  <h3>{tip.title}</h3>
                  <p>{tip.description}</p>
                  <button className="btn btn-secondary btn-sm">
                    <i className="fas fa-book-open"></i> View Instructions
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTip && (
          <div className="modal active" onClick={closeModal}>
            <div className="modal-content tip-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
              
              <div className="tip-header">
                <div className="tip-icon-large">
                  <i className={`fas ${getCategoryIcon(selectedTip.category)}`}></i>
                </div>
                <div>
                  <span className="tip-category">{selectedTip.category}</span>
                  <h2>{selectedTip.title}</h2>
                </div>
              </div>

              <div className="tip-description">
                <p>{selectedTip.description}</p>
              </div>

              <div className="tip-steps">
                <h3><i className="fas fa-list-ol"></i> Step-by-Step Instructions</h3>
                <div className="steps-content">
                  {selectedTip.steps.split('\n').map((step, index) => (
                    step.trim() && (
                      <div key={index} className="step-item">
                        <span className="step-number">{index + 1}</span>
                        <p>{step.replace(/^\d+\.\s*/, '')}</p>
                      </div>
                    )
                  ))}
                </div>
              </div>

              {selectedTip.warnings && (
                <div className="tip-warnings">
                  <h3><i className="fas fa-exclamation-triangle"></i> Important Warnings</h3>
                  <p>{selectedTip.warnings}</p>
                </div>
              )}

              <div className="emergency-note">
                <i className="fas fa-phone-alt"></i>
                <strong>Always call emergency services (112 or 102) for serious medical emergencies!</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FirstAid;
