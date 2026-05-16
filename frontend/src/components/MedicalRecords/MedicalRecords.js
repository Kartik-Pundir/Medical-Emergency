import React, { useState, useEffect } from 'react';
import { medicalRecordsAPI } from '../../services/api';
import Header from '../Layout/Header';
import './MedicalRecords.css';

function MedicalRecords({ user, onLogout }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [formData, setFormData] = useState({
    record_type: 'allergy',
    title: '',
    description: '',
    is_critical: false,
  });

  useEffect(() => {
    loadRecords();
  }, [filterType]);

  const loadRecords = async () => {
    try {
      setLoading(true);
      const response = await medicalRecordsAPI.getRecords(filterType || null);
      if (response.data.success) {
        setRecords(response.data.records);
      }
    } catch (error) {
      console.error('Load records error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await medicalRecordsAPI.addRecord(formData);
      if (response.data.success) {
        alert('Medical record added successfully!');
        setShowAddForm(false);
        setFormData({
          record_type: 'allergy',
          title: '',
          description: '',
          is_critical: false,
        });
        loadRecords();
      }
    } catch (error) {
      console.error('Add record error:', error);
      alert('Failed to add record');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const response = await medicalRecordsAPI.deleteRecord(id);
        if (response.data.success) {
          alert('Record deleted successfully!');
          loadRecords();
        }
      } catch (error) {
        console.error('Delete record error:', error);
        alert('Failed to delete record');
      }
    }
  };

  const getRecordIcon = (type) => {
    const icons = {
      allergy: 'fa-allergies',
      medication: 'fa-pills',
      condition: 'fa-disease',
      surgery: 'fa-user-md',
      vaccination: 'fa-syringe',
    };
    return icons[type] || 'fa-file-medical';
  };

  return (
    <div className="records-page">
      <Header user={user} onLogout={onLogout} />
      
      <div className="container">
        <div className="page-header">
          <h2>
            <i className="fas fa-file-medical"></i> Medical Records
          </h2>
          <p>Manage your medical history and records</p>
        </div>

        <div className="actions-bar">
          <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
            <i className="fas fa-plus"></i> Add New Record
          </button>
          
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">All Records</option>
            <option value="allergy">Allergies</option>
            <option value="medication">Medications</option>
            <option value="condition">Conditions</option>
            <option value="surgery">Surgeries</option>
            <option value="vaccination">Vaccinations</option>
          </select>
        </div>

        {showAddForm && (
          <div className="card">
            <h3>Add New Medical Record</h3>
            <form onSubmit={handleSubmit} className="record-form">
              <div className="form-group">
                <label>Record Type</label>
                <select
                  value={formData.record_type}
                  onChange={(e) => setFormData({ ...formData, record_type: e.target.value })}
                  required
                >
                  <option value="allergy">Allergy</option>
                  <option value="medication">Medication</option>
                  <option value="condition">Medical Condition</option>
                  <option value="surgery">Surgery</option>
                  <option value="vaccination">Vaccination</option>
                </select>
              </div>

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Penicillin Allergy"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Additional details..."
                  rows="3"
                ></textarea>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.is_critical}
                    onChange={(e) => setFormData({ ...formData, is_critical: e.target.checked })}
                  />
                  Mark as Critical
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-save"></i> Save Record
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="loading">Loading records...</div>
        ) : records.length === 0 ? (
          <div className="card">
            <p className="text-muted">No medical records found. Add your first record above.</p>
          </div>
        ) : (
          <div className="records-grid">
            {records.map((record) => (
              <div key={record.id} className={`record-card ${record.is_critical ? 'critical' : ''}`}>
                <div className="record-header">
                  <div className="record-icon">
                    <i className={`fas ${getRecordIcon(record.record_type)}`}></i>
                  </div>
                  <div className="record-info">
                    <h3>{record.title}</h3>
                    <span className="record-type">{record.record_type}</span>
                    {record.is_critical && (
                      <span className="critical-badge">
                        <i className="fas fa-exclamation-triangle"></i> Critical
                      </span>
                    )}
                  </div>
                </div>
                
                {record.description && (
                  <p className="record-description">{record.description}</p>
                )}
                
                <div className="record-footer">
                  <small>Added: {new Date(record.created_at).toLocaleDateString()}</small>
                  <button 
                    className="btn-delete" 
                    onClick={() => handleDelete(record.id)}
                    title="Delete record"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MedicalRecords;
