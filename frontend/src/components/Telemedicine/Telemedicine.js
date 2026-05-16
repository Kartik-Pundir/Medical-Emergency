import React from 'react';
import Header from '../Layout/Header';
import './Telemedicine.css';

function Telemedicine({ user, onLogout }) {

  const services = [
    {
      id: 1,
      title: 'Video Consultation',
      icon: 'video',
      description: 'Face-to-face consultation with doctors via video call',
      duration: '15-30 mins',
      price: 500,
      features: ['HD Video Call', 'Screen Sharing', 'Digital Prescription', 'Follow-up Support'],
    },
    {
      id: 2,
      title: 'Chat Consultation',
      icon: 'comments',
      description: 'Text-based consultation for quick medical advice',
      duration: '10-20 mins',
      price: 300,
      features: ['Instant Messaging', 'Image Sharing', 'Quick Response', 'Affordable'],
    },
    {
      id: 3,
      title: 'Phone Consultation',
      icon: 'phone',
      description: 'Voice call consultation with medical experts',
      duration: '15-25 mins',
      price: 400,
      features: ['Voice Call', 'No Video Required', 'Privacy Focused', 'Easy Access'],
    },
  ];

  const handleStartConsultation = (service) => {
    alert(`Starting ${service.title}...\n\nYou will be connected with an available doctor shortly.\n\nConsultation Fee: ₹${service.price}\nEstimated Duration: ${service.duration}`);
  };

  return (
    <div className="telemedicine">
      <Header user={user} onLogout={onLogout} />
      
      <div className="container">
        <div className="page-header">
          <h2>
            <i className="fas fa-video"></i>
            Telemedicine Services
          </h2>
          <p>Consult with doctors from the comfort of your home</p>
        </div>

        {/* Hero Banner */}
        <div className="tele-hero">
          <div className="tele-hero-content">
            <h3>Healthcare at Your Fingertips</h3>
            <p>Connect with certified doctors 24/7 through video, chat, or phone</p>
            <div className="hero-stats">
              <div className="stat">
                <strong>500+</strong>
                <span>Doctors Online</span>
              </div>
              <div className="stat">
                <strong>24/7</strong>
                <span>Available</span>
              </div>
              <div className="stat">
                <strong>10k+</strong>
                <span>Consultations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="services-section">
          <h3>Choose Your Consultation Type</h3>
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon">
                  <i className={`fas fa-${service.icon}`}></i>
                </div>
                <h4>{service.title}</h4>
                <p className="description">{service.description}</p>
                <div className="service-meta">
                  <span><i className="fas fa-clock"></i> {service.duration}</span>
                  <span className="price">₹{service.price}</span>
                </div>
                <ul className="features-list">
                  {service.features.map((feature, index) => (
                    <li key={index}>
                      <i className="fas fa-check"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => handleStartConsultation(service)}
                >
                  Start Consultation
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="how-it-works">
          <h3>How It Works</h3>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h4>Choose Service</h4>
              <p>Select video, chat, or phone consultation</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h4>Connect with Doctor</h4>
              <p>Get matched with an available specialist</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h4>Get Treatment</h4>
              <p>Receive diagnosis and digital prescription</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h4>Follow Up</h4>
              <p>Access records and schedule follow-ups</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="benefits-section">
          <h3>Why Choose Telemedicine?</h3>
          <div className="benefits-grid">
            <div className="benefit">
              <i className="fas fa-home"></i>
              <h4>Consult from Home</h4>
              <p>No need to travel or wait in queues</p>
            </div>
            <div className="benefit">
              <i className="fas fa-clock"></i>
              <h4>Save Time</h4>
              <p>Quick consultations at your convenience</p>
            </div>
            <div className="benefit">
              <i className="fas fa-shield-alt"></i>
              <h4>Safe & Secure</h4>
              <p>HIPAA compliant and encrypted</p>
            </div>
            <div className="benefit">
              <i className="fas fa-dollar-sign"></i>
              <h4>Affordable</h4>
              <p>Lower costs than in-person visits</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Telemedicine;
