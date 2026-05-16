import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { emergencyAPI } from '../../services/api';
import Header from '../Layout/Header';
import './Dashboard.css';

function Dashboard({ user, onLogout }) {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadRecentAlerts();
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Location error:', error);
        }
      );
    }
  };

  const loadRecentAlerts = async () => {
    try {
      const response = await emergencyAPI.getAlerts(5);
      if (response.data.success) {
        setAlerts(response.data.alerts);
      }
    } catch (error) {
      console.error('Load alerts error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSOSClick = () => {
    if (!location) {
      alert('Getting your location...');
      getUserLocation();
      return;
    }
    navigate('/emergency');
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f39c12',
      acknowledged: '#3498db',
      dispatched: '#9b59b6',
      resolved: '#27ae60',
      cancelled: '#95a5a6',
    };
    return colors[status] || '#95a5a6';
  };

  return (
    <div className="dashboard">
      <Header user={user} onLogout={onLogout} />
      
      <div className="container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              <i className="fas fa-shield-alt"></i>
              Healthcare Excellence
            </div>
            <h1 className="hero-title">
              Trusted Healthcare Services, Worldwide Reach
            </h1>
            <p className="hero-description">
              Delivering patient-focused care with advanced technology, expert professionals, and personalized treatment plans designed to restore health and well-being at every stage of life.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/appointments')}>
                <i className="fas fa-calendar-check"></i>
                Book Free Consultation
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/facilities')}>
                <i className="fas fa-hospital"></i>
                Find Hospitals
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-value">1.6M+</div>
            <div className="stat-label">Patients Served</div>
            <div className="stat-trend">↑ 12% this month</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-hospital"></i>
            </div>
            <div className="stat-value">500+</div>
            <div className="stat-label">Healthcare Facilities</div>
            <div className="stat-trend">↑ 8% growth</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-user-md"></i>
            </div>
            <div className="stat-value">2,000+</div>
            <div className="stat-label">Expert Doctors</div>
            <div className="stat-trend">24/7 Available</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-award"></i>
            </div>
            <div className="stat-value">98%</div>
            <div className="stat-label">Satisfaction Rate</div>
            <div className="stat-trend">⭐ 4.9/5 Rating</div>
          </div>
        </div>

        {/* Emergency Services Section */}
        <div className="emergency-services-section">
          <h2 className="section-title">
            <i className="fas fa-ambulance"></i>
            Emergency Services
          </h2>
          <div className="services-grid">
            <div className="service-card emergency-card">
              <div className="service-icon">
                <i className="fas fa-phone-volume"></i>
              </div>
              <h3>24/7 Emergency Hotline</h3>
              <p>Immediate medical assistance available round the clock</p>
              <div className="emergency-numbers">
                <div className="emergency-number">
                  <i className="fas fa-phone"></i>
                  <span>108 - Ambulance</span>
                </div>
                <div className="emergency-number">
                  <i className="fas fa-phone"></i>
                  <span>102 - Medical Emergency</span>
                </div>
              </div>
              <button className="btn btn-danger" onClick={handleSOSClick}>
                <i className="fas fa-exclamation-triangle"></i>
                Call Emergency
              </button>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-heartbeat"></i>
              </div>
              <h3>Critical Care</h3>
              <p>Advanced life support and intensive care units</p>
              <ul className="service-features">
                <li><i className="fas fa-check"></i> ICU Facilities</li>
                <li><i className="fas fa-check"></i> Ventilator Support</li>
                <li><i className="fas fa-check"></i> Cardiac Monitoring</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-procedures"></i>
              </div>
              <h3>Trauma Care</h3>
              <p>Specialized emergency trauma and accident care</p>
              <ul className="service-features">
                <li><i className="fas fa-check"></i> Rapid Response</li>
                <li><i className="fas fa-check"></i> Expert Surgeons</li>
                <li><i className="fas fa-check"></i> Advanced Equipment</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SOS Button */}
        <div className="sos-section">
          <button className="sos-button" onClick={handleSOSClick}>
            <i className="fas fa-exclamation-triangle"></i>
            <span>SOS</span>
            <small>Press for Emergency</small>
          </button>
          <p className="sos-description">One-click emergency alert with GPS location</p>
        </div>

        {/* Quick Actions */}
        <h2 className="section-title">
          <i className="fas fa-bolt"></i>
          Quick Access
        </h2>
        <div className="quick-actions">
          <div className="action-card" onClick={() => navigate('/facilities')}>
            <i className="fas fa-hospital"></i>
            <span>Nearby Facilities</span>
            <small>Find hospitals & clinics</small>
          </div>
          <div className="action-card" onClick={() => navigate('/emergency')}>
            <i className="fas fa-ambulance"></i>
            <span>Request Ambulance</span>
            <small>Emergency transport</small>
          </div>
          <div className="action-card" onClick={() => navigate('/records')}>
            <i className="fas fa-file-medical"></i>
            <span>Medical Records</span>
            <small>View health history</small>
          </div>
          <div className="action-card" onClick={() => navigate('/first-aid')}>
            <i className="fas fa-first-aid"></i>
            <span>First Aid Guide</span>
            <small>Emergency procedures</small>
          </div>
          <div className="action-card" onClick={() => navigate('/pharmacy')}>
            <i className="fas fa-pills"></i>
            <span>Pharmacy</span>
            <small>Find medicines</small>
          </div>
          <div className="action-card" onClick={() => navigate('/appointments')}>
            <i className="fas fa-calendar-check"></i>
            <span>Appointments</span>
            <small>Book doctor visits</small>
          </div>
          <div className="action-card" onClick={() => navigate('/telemedicine')}>
            <i className="fas fa-video"></i>
            <span>Telemedicine</span>
            <small>Online consultation</small>
          </div>
          <div className="action-card" onClick={() => navigate('/health-tips')}>
            <i className="fas fa-notes-medical"></i>
            <span>Health Tips</span>
            <small>Wellness advice</small>
          </div>
        </div>

        {/* Health Services */}
        <div className="health-services-section">
          <h2 className="section-title">
            <i className="fas fa-stethoscope"></i>
            Our Healthcare Services
          </h2>
          <div className="services-list">
            <div className="service-item">
              <div className="service-item-icon">
                <i className="fas fa-user-md"></i>
              </div>
              <div className="service-item-content">
                <h4>General Medicine</h4>
                <p>Comprehensive primary care and health checkups</p>
              </div>
            </div>
            <div className="service-item">
              <div className="service-item-icon">
                <i className="fas fa-heart"></i>
              </div>
              <div className="service-item-content">
                <h4>Cardiology</h4>
                <p>Heart care and cardiovascular treatments</p>
              </div>
            </div>
            <div className="service-item">
              <div className="service-item-icon">
                <i className="fas fa-brain"></i>
              </div>
              <div className="service-item-content">
                <h4>Neurology</h4>
                <p>Brain and nervous system specialists</p>
              </div>
            </div>
            <div className="service-item">
              <div className="service-item-icon">
                <i className="fas fa-bone"></i>
              </div>
              <div className="service-item-content">
                <h4>Orthopedics</h4>
                <p>Bone, joint, and muscle care</p>
              </div>
            </div>
            <div className="service-item">
              <div className="service-item-icon">
                <i className="fas fa-baby"></i>
              </div>
              <div className="service-item-content">
                <h4>Pediatrics</h4>
                <p>Specialized child healthcare</p>
              </div>
            </div>
            <div className="service-item">
              <div className="service-item-icon">
                <i className="fas fa-eye"></i>
              </div>
              <div className="service-item-content">
                <h4>Ophthalmology</h4>
                <p>Eye care and vision services</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="section">
          <h2 className="section-title">
            <i className="fas fa-bell"></i> Recent Emergency Alerts
          </h2>
          <div className="card">
            {loading ? (
              <div className="loading-state">
                <i className="fas fa-spinner fa-spin"></i>
                <p>Loading alerts...</p>
              </div>
            ) : alerts.length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-check-circle"></i>
                <p>No recent emergency alerts</p>
                <small>All systems operational</small>
              </div>
            ) : (
              alerts.map((alert) => (
                <div key={alert.id} className={`alert-item ${alert.severity}`}>
                  <div className="alert-header">
                    <div>
                      <strong>{alert.alert_type.toUpperCase()}</strong>
                      <span className="badge" style={{ background: getStatusColor(alert.status) }}>
                        {alert.status}
                      </span>
                    </div>
                    <small>{new Date(alert.created_at).toLocaleString()}</small>
                  </div>
                  <p>{alert.description || 'No description'}</p>
                  {alert.facility_name && (
                    <p className="facility-info">
                      <i className="fas fa-hospital"></i> {alert.facility_name}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="why-choose-section">
          <h2 className="section-title">
            <i className="fas fa-star"></i>
            Why Choose Us
          </h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h4>24/7 Availability</h4>
              <p>Round-the-clock emergency services and medical support</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h4>Certified Professionals</h4>
              <p>Highly qualified and experienced medical staff</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-laptop-medical"></i>
              </div>
              <h4>Advanced Technology</h4>
              <p>State-of-the-art medical equipment and facilities</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-hand-holding-heart"></i>
              </div>
              <h4>Patient-Centered Care</h4>
              <p>Personalized treatment plans for every patient</p>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="emergency-contact-section">
          <div className="emergency-contact-card">
            <div className="emergency-contact-icon">
              <i className="fas fa-phone-alt"></i>
            </div>
            <div className="emergency-contact-content">
              <h3>Need Immediate Help?</h3>
              <p>Our emergency response team is available 24/7</p>
              <div className="contact-buttons">
                <button className="btn btn-danger" onClick={handleSOSClick}>
                  <i className="fas fa-ambulance"></i>
                  Emergency SOS
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/facilities')}>
                  <i className="fas fa-hospital"></i>
                  Find Hospital
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
