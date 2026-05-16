import React, { useState } from 'react';
import Header from '../Layout/Header';
import './Appointments.css';

function Appointments({ user, onLogout }) {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');

  const specialties = [
    { id: 'all', name: 'All Specialties', icon: 'user-md' },
    { id: 'cardiology', name: 'Cardiology', icon: 'heartbeat' },
    { id: 'neurology', name: 'Neurology', icon: 'brain' },
    { id: 'orthopedics', name: 'Orthopedics', icon: 'bone' },
    { id: 'pediatrics', name: 'Pediatrics', icon: 'baby' },
    { id: 'general', name: 'General Medicine', icon: 'stethoscope' },
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'cardiology',
      experience: '15 years',
      rating: 4.9,
      reviews: 234,
      fee: 800,
      available: true,
      nextAvailable: '2026-05-13',
      image: '👩‍⚕️',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'neurology',
      experience: '12 years',
      rating: 4.8,
      reviews: 189,
      fee: 1000,
      available: true,
      nextAvailable: '2026-05-13',
      image: '👨‍⚕️',
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'pediatrics',
      experience: '10 years',
      rating: 4.9,
      reviews: 312,
      fee: 700,
      available: true,
      nextAvailable: '2026-05-13',
      image: '👩‍⚕️',
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialty: 'orthopedics',
      experience: '18 years',
      rating: 4.7,
      reviews: 156,
      fee: 900,
      available: true,
      nextAvailable: '2026-05-14',
      image: '👨‍⚕️',
    },
    {
      id: 5,
      name: 'Dr. Priya Sharma',
      specialty: 'general',
      experience: '8 years',
      rating: 4.8,
      reviews: 278,
      fee: 600,
      available: true,
      nextAvailable: '2026-05-13',
      image: '👩‍⚕️',
    },
    {
      id: 6,
      name: 'Dr. Robert Taylor',
      specialty: 'cardiology',
      experience: '20 years',
      rating: 4.9,
      reviews: 401,
      fee: 1200,
      available: true,
      nextAvailable: '2026-05-14',
      image: '👨‍⚕️',
    },
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM', '06:00 PM',
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    return selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
  });

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time for your appointment.');
      return;
    }
    alert(`Appointment booked successfully!\n\nDoctor: ${selectedDoctor.name}\nDate: ${selectedDate}\nTime: ${selectedTime}\nFee: ₹${selectedDoctor.fee}\n\nYou will receive a confirmation email shortly.`);
    setShowBookingModal(false);
    setSelectedDate('');
    setSelectedTime('');
  };

  return (
    <div className="appointments">
      <Header user={user} onLogout={onLogout} />
      
      <div className="container">
        <div className="page-header">
          <h2>
            <i className="fas fa-calendar-check"></i>
            Book Appointment
          </h2>
          <p>Schedule a consultation with our expert doctors</p>
        </div>

        {/* Specialties Filter */}
        <div className="specialties-section">
          <h3>Select Specialty</h3>
          <div className="specialties-grid">
            {specialties.map((specialty) => (
              <div
                key={specialty.id}
                className={`specialty-card ${selectedSpecialty === specialty.id ? 'active' : ''}`}
                onClick={() => setSelectedSpecialty(specialty.id)}
              >
                <i className={`fas fa-${specialty.icon}`}></i>
                <span>{specialty.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Doctors List */}
        <div className="doctors-section">
          <h3>
            Available Doctors
            <span className="count">({filteredDoctors.length} doctors)</span>
          </h3>
          
          <div className="doctors-grid">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-header">
                  <div className="doctor-image">{doctor.image}</div>
                  <div className="doctor-info">
                    <h4>{doctor.name}</h4>
                    <p className="specialty">
                      {specialties.find(s => s.id === doctor.specialty)?.name}
                    </p>
                    <p className="experience">
                      <i className="fas fa-briefcase"></i>
                      {doctor.experience} experience
                    </p>
                  </div>
                </div>
                <div className="rating">
                  <i className="fas fa-star"></i>
                  <span>{doctor.rating}</span>
                  <small>({doctor.reviews} reviews)</small>
                </div>
                <div className="availability">
                  <i className="fas fa-calendar"></i>
                  Next available: {new Date(doctor.nextAvailable).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="doctor-footer">
                  <div className="fee">₹{doctor.fee}</div>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleBookAppointment(doctor)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="features-section">
          <div className="feature-item">
            <i className="fas fa-video"></i>
            <div>
              <strong>Video Consultation</strong>
              <p>Consult from home</p>
            </div>
          </div>
          <div className="feature-item">
            <i className="fas fa-clock"></i>
            <div>
              <strong>Flexible Timing</strong>
              <p>Morning & evening slots</p>
            </div>
          </div>
          <div className="feature-item">
            <i className="fas fa-undo"></i>
            <div>
              <strong>Easy Rescheduling</strong>
              <p>Change anytime</p>
            </div>
          </div>
          <div className="feature-item">
            <i className="fas fa-file-medical"></i>
            <div>
              <strong>Digital Records</strong>
              <p>Access prescriptions online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Book Appointment</h3>
              <button className="close-btn" onClick={() => setShowBookingModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="doctor-summary">
                <div className="doctor-image-large">{selectedDoctor?.image}</div>
                <div>
                  <h4>{selectedDoctor?.name}</h4>
                  <p>{specialties.find(s => s.id === selectedDoctor?.specialty)?.name}</p>
                  <p className="fee-large">Consultation Fee: ₹{selectedDoctor?.fee}</p>
                </div>
              </div>

              <div className="form-group">
                <label>Select Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group">
                <label>Select Time Slot</label>
                <div className="time-slots">
                  {timeSlots.map((slot) => (
                    <div
                      key={slot}
                      className={`time-slot ${selectedTime === slot ? 'selected' : ''}`}
                      onClick={() => setSelectedTime(slot)}
                    >
                      {slot}
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="btn btn-primary btn-block"
                onClick={handleConfirmBooking}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointments;
