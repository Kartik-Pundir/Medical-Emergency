import React, { useState } from 'react';
import Header from '../Layout/Header';
import './HealthTips.css';

function HealthTips({ user, onLogout }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Tips', icon: 'notes-medical' },
    { id: 'nutrition', name: 'Nutrition', icon: 'apple-alt' },
    { id: 'fitness', name: 'Fitness', icon: 'dumbbell' },
    { id: 'mental', name: 'Mental Health', icon: 'brain' },
    { id: 'sleep', name: 'Sleep', icon: 'bed' },
    { id: 'hygiene', name: 'Hygiene', icon: 'hands-wash' },
  ];

  const tips = [
    {
      id: 1,
      category: 'nutrition',
      title: 'Stay Hydrated',
      description: 'Drink at least 8 glasses of water daily to keep your body hydrated and functioning optimally.',
      icon: 'tint',
      color: '#3498db',
    },
    {
      id: 2,
      category: 'fitness',
      title: 'Exercise Regularly',
      description: 'Aim for at least 30 minutes of moderate exercise 5 days a week to maintain good health.',
      icon: 'running',
      color: '#e74c3c',
    },
    {
      id: 3,
      category: 'nutrition',
      title: 'Eat Balanced Meals',
      description: 'Include fruits, vegetables, whole grains, and lean proteins in your daily diet.',
      icon: 'utensils',
      color: '#27ae60',
    },
    {
      id: 4,
      category: 'sleep',
      title: 'Get Enough Sleep',
      description: 'Adults should aim for 7-9 hours of quality sleep each night for optimal health.',
      icon: 'moon',
      color: '#9b59b6',
    },
    {
      id: 5,
      category: 'mental',
      title: 'Practice Mindfulness',
      description: 'Take 10 minutes daily for meditation or deep breathing to reduce stress and anxiety.',
      icon: 'spa',
      color: '#f39c12',
    },
    {
      id: 6,
      category: 'hygiene',
      title: 'Wash Hands Frequently',
      description: 'Wash your hands with soap for at least 20 seconds to prevent infections.',
      icon: 'hands-wash',
      color: '#1abc9c',
    },
    {
      id: 7,
      category: 'fitness',
      title: 'Take Regular Breaks',
      description: 'Stand up and stretch every hour if you have a desk job to prevent stiffness.',
      icon: 'walking',
      color: '#e67e22',
    },
    {
      id: 8,
      category: 'nutrition',
      title: 'Limit Sugar Intake',
      description: 'Reduce consumption of sugary drinks and processed foods for better health.',
      icon: 'candy-cane',
      color: '#e74c3c',
    },
    {
      id: 9,
      category: 'mental',
      title: 'Stay Connected',
      description: 'Maintain social connections with friends and family for emotional well-being.',
      icon: 'users',
      color: '#3498db',
    },
    {
      id: 10,
      category: 'sleep',
      title: 'Create Sleep Routine',
      description: 'Go to bed and wake up at the same time daily to regulate your sleep cycle.',
      icon: 'clock',
      color: '#9b59b6',
    },
    {
      id: 11,
      category: 'fitness',
      title: 'Practice Good Posture',
      description: 'Maintain proper posture while sitting and standing to prevent back pain.',
      icon: 'user-check',
      color: '#27ae60',
    },
    {
      id: 12,
      category: 'hygiene',
      title: 'Dental Care',
      description: 'Brush twice daily and floss regularly to maintain good oral health.',
      icon: 'tooth',
      color: '#1abc9c',
    },
  ];

  const filteredTips = tips.filter((tip) => {
    return selectedCategory === 'all' || tip.category === selectedCategory;
  });

  return (
    <div className="health-tips">
      <Header user={user} onLogout={onLogout} />
      
      <div className="container">
        <div className="page-header">
          <h2>
            <i className="fas fa-notes-medical"></i>
            Health & Wellness Tips
          </h2>
          <p>Expert advice for a healthier lifestyle</p>
        </div>

        {/* Daily Tip Banner */}
        <div className="daily-tip-banner">
          <div className="daily-tip-icon">
            <i className="fas fa-lightbulb"></i>
          </div>
          <div className="daily-tip-content">
            <h3>💡 Tip of the Day</h3>
            <p>Start your morning with a glass of warm water and lemon to boost metabolism and aid digestion!</p>
          </div>
        </div>

        {/* Categories */}
        <div className="categories-section">
          <h3>Browse by Category</h3>
          <div className="categories-grid">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <i className={`fas fa-${category.icon}`}></i>
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Grid */}
        <div className="tips-section">
          <h3>
            {selectedCategory === 'all' ? 'All Health Tips' : categories.find(c => c.id === selectedCategory)?.name + ' Tips'}
            <span className="count">({filteredTips.length} tips)</span>
          </h3>
          
          <div className="tips-grid">
            {filteredTips.map((tip) => (
              <div key={tip.id} className="tip-card">
                <div className="tip-icon" style={{ background: `${tip.color}15` }}>
                  <i className={`fas fa-${tip.icon}`} style={{ color: tip.color }}></i>
                </div>
                <h4>{tip.title}</h4>
                <p>{tip.description}</p>
                <div className="tip-category">
                  {categories.find(c => c.id === tip.category)?.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="newsletter-section">
          <div className="newsletter-card">
            <div className="newsletter-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="newsletter-content">
              <h3>Get Weekly Health Tips</h3>
              <p>Subscribe to our newsletter for expert health advice delivered to your inbox</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Enter your email address" />
                <button className="btn btn-primary">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="stats-section">
          <div className="stat-item">
            <i className="fas fa-heart"></i>
            <div>
              <strong>Heart Health</strong>
              <p>30 min exercise daily</p>
            </div>
          </div>
          <div className="stat-item">
            <i className="fas fa-glass-water"></i>
            <div>
              <strong>Hydration</strong>
              <p>8 glasses of water</p>
            </div>
          </div>
          <div className="stat-item">
            <i className="fas fa-bed"></i>
            <div>
              <strong>Sleep</strong>
              <p>7-9 hours nightly</p>
            </div>
          </div>
          <div className="stat-item">
            <i className="fas fa-apple-alt"></i>
            <div>
              <strong>Nutrition</strong>
              <p>5 servings of fruits/veggies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthTips;
