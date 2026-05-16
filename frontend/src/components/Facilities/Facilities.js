import React, { useState, useEffect } from 'react';
import { facilitiesAPI } from '../../services/api';
import Header from '../Layout/Header';
import './Facilities.css';

function Facilities({ user, onLogout }) {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState('');
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (location) {
      loadFacilities();
    }
  }, [location, filterType]);

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
          // Use default location (Delhi, India) if location access denied
          setLocation({
            latitude: 28.6139,
            longitude: 77.2090,
          });
          setError('Using default location (Delhi). Please enable location for accurate results.');
        }
      );
    } else {
      // Use default location if geolocation not supported
      setLocation({
        latitude: 28.6139,
        longitude: 77.2090,
      });
      setError('Geolocation not supported. Using default location (Delhi).');
    }
  };

  const loadFacilities = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Loading facilities with location:', location);
      
      const response = await facilitiesAPI.findNearby(
        location.latitude,
        location.longitude,
        filterType || null
      );
      
      console.log('Facilities response:', response.data);
      
      if (response.data.success) {
        setFacilities(response.data.facilities);
        if (response.data.facilities.length === 0) {
          setError('No facilities found nearby. Try increasing the search radius.');
        }
      } else {
        setError(response.data.message || 'Failed to load facilities');
      }
    } catch (err) {
      console.error('Load facilities error:', err);
      if (err.response) {
        setError(err.response.data?.message || 'Server error');
      } else if (err.request) {
        setError('Cannot connect to server');
      } else {
        setError('Failed to load facilities');
      }
    } finally {
      setLoading(false);
    }
  };

  const getFacilityIcon = (type) => {
    const icons = {
      hospital: 'fa-hospital',
      clinic: 'fa-clinic-medical',
      pharmacy: 'fa-pills',
      diagnostic_center: 'fa-microscope',
    };
    return icons[type] || 'fa-hospital';
  };

  return (
    <div className="facilities-page">
      <Header user={user} onLogout={onLogout} />
      
      <div className="container">
        <div className="page-header">
          <h2>
            <i className="fas fa-hospital"></i> Nearby Healthcare Facilities
          </h2>
          <p>Find hospitals, clinics, and pharmacies near you</p>
        </div>

        <div className="filter-section">
          <label>Filter by Type:</label>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">All Facilities</option>
            <option value="hospital">Hospitals</option>
            <option value="clinic">Clinics</option>
            <option value="pharmacy">Pharmacies</option>
            <option value="diagnostic_center">Diagnostic Centers</option>
          </select>
          
          {location && (
            <div className="location-display">
              <i className="fas fa-map-marker-alt"></i>
              <span>Location: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</span>
              <button className="btn btn-sm btn-secondary" onClick={getUserLocation}>
                <i className="fas fa-sync-alt"></i> Refresh
              </button>
            </div>
          )}
        </div>

        {error && <div className="error">{error}</div>}

        {loading ? (
          <div className="loading">
            <i className="fas fa-spinner fa-spin"></i> Loading facilities...
          </div>
        ) : facilities.length === 0 ? (
          <div className="card">
            <p className="text-muted">No facilities found nearby</p>
          </div>
        ) : (
          <div className="facilities-grid">
            {facilities.map((facility) => (
              <div key={facility.id} className="facility-card">
                <div className="facility-header">
                  <i className={`fas ${getFacilityIcon(facility.type)}`}></i>
                  <div>
                    <h3>{facility.name}</h3>
                    <span className="facility-type">{facility.type.replace('_', ' ')}</span>
                  </div>
                </div>
                
                <div className="facility-info">
                  <p>
                    <i className="fas fa-map-marker-alt"></i>
                    {facility.address}
                  </p>
                  <p>
                    <i className="fas fa-phone"></i>
                    {facility.phone}
                  </p>
                  <p>
                    <i className="fas fa-route"></i>
                    {facility.distance ? `${facility.distance.toFixed(2)} km away` : 'Distance unknown'}
                  </p>
                  
                  {facility.has_emergency && (
                    <span className="badge badge-emergency">
                      <i className="fas fa-ambulance"></i> Emergency Services
                    </span>
                  )}
                  
                  {facility.has_ambulance && (
                    <span className="badge badge-ambulance">
                      <i className="fas fa-truck-medical"></i> Ambulance Available
                    </span>
                  )}
                  
                  {facility.available_beds > 0 && (
                    <p className="beds-info">
                      <i className="fas fa-bed"></i>
                      {facility.available_beds} beds available
                    </p>
                  )}
                  
                  {facility.rating > 0 && (
                    <div className="rating">
                      <i className="fas fa-star"></i>
                      {facility.rating} / 5.0
                    </div>
                  )}
                </div>
                
                <div className="facility-actions">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${facility.latitude},${facility.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <i className="fas fa-directions"></i> Get Directions
                  </a>
                  <a href={`tel:${facility.phone}`} className="btn btn-primary btn-sm">
                    <i className="fas fa-phone"></i> Call
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Facilities;
