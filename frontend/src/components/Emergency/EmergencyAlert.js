import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { emergencyAPI } from '../../services/api';
import Header from '../Layout/Header';
import './EmergencyAlert.css';

function EmergencyAlert({ user, onLogout }) {
  const [formData, setFormData] = useState({
    alert_type: 'medical',
    severity: 'high',
    description: '',
  });
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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
          setError('Please enable location services to send emergency alerts');
          console.error('Location error:', error);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!location) {
      setError('Location is required. Please enable location services.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const alertData = {
        ...formData,
        latitude: location.latitude,
        longitude: location.longitude,
      };

      const response = await emergencyAPI.createAlert(alertData);
      
      if (response.data.success) {
        setSuccess('Emergency alert sent successfully! Help is on the way.');
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Failed to send emergency alert. Please try again.');
      console.error('Emergency alert error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="emergency-page">
      <Header user={user} onLogout={onLogout} />
      
      <div className="container">
        <div className="emergency-card">
          <div className="emergency-header">
            <i className="fas fa-exclamation-triangle"></i>
            <h2>Emergency Alert</h2>
            <p>Fill in the details and we'll send help immediately</p>
          </div>

          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          <form onSubmit={handleSubmit} className="emergency-form">
            <div className="form-group">
              <label>
                <i className="fas fa-heartbeat"></i> Emergency Type
              </label>
              <select
                name="alert_type"
                value={formData.alert_type}
                onChange={handleChange}
                required
              >
                <option value="medical">Medical Emergency</option>
                <option value="accident">Accident</option>
                <option value="cardiac">Cardiac Arrest</option>
                <option value="breathing">Breathing Problem</option>
                <option value="injury">Severe Injury</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                <i className="fas fa-exclamation-circle"></i> Severity Level
              </label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                required
              >
                <option value="critical">Critical - Life Threatening</option>
                <option value="high">High - Urgent</option>
                <option value="medium">Medium - Serious</option>
                <option value="low">Low - Non-urgent</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                <i className="fas fa-comment-medical"></i> Description (Optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe the emergency situation..."
              ></textarea>
            </div>

            <div className="location-info">
              <i className="fas fa-map-marker-alt"></i>
              {location ? (
                <span>
                  Location detected: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                </span>
              ) : (
                <span>Getting your location...</span>
              )}
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/dashboard')}
              >
                <i className="fas fa-times"></i> Cancel
              </button>
              <button
                type="submit"
                className="btn btn-danger"
                disabled={loading || !location}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Send Emergency Alert
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmergencyAlert;
