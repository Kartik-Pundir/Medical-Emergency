import React, { useState } from 'react';
import Header from '../Layout/Header';
import './Pharmacy.css';

function Pharmacy({ user, onLogout }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Medicines', icon: 'pills' },
    { id: 'prescription', name: 'Prescription', icon: 'prescription' },
    { id: 'otc', name: 'Over the Counter', icon: 'shopping-cart' },
    { id: 'supplements', name: 'Supplements', icon: 'leaf' },
    { id: 'first-aid', name: 'First Aid', icon: 'first-aid' },
  ];

  const medicines = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'otc',
      price: 25,
      description: 'Pain relief and fever reducer',
      inStock: true,
      prescription: false,
      manufacturer: 'PharmaCorp',
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      category: 'prescription',
      price: 120,
      description: 'Antibiotic for bacterial infections',
      inStock: true,
      prescription: true,
      manufacturer: 'MediLife',
    },
    {
      id: 3,
      name: 'Vitamin D3 1000 IU',
      category: 'supplements',
      price: 350,
      description: 'Daily vitamin D supplement',
      inStock: true,
      prescription: false,
      manufacturer: 'HealthPlus',
    },
    {
      id: 4,
      name: 'Ibuprofen 400mg',
      category: 'otc',
      price: 45,
      description: 'Anti-inflammatory pain reliever',
      inStock: true,
      prescription: false,
      manufacturer: 'PharmaCorp',
    },
    {
      id: 5,
      name: 'Bandage Roll',
      category: 'first-aid',
      price: 30,
      description: 'Sterile medical bandage',
      inStock: true,
      prescription: false,
      manufacturer: 'MedSupply',
    },
    {
      id: 6,
      name: 'Omeprazole 20mg',
      category: 'prescription',
      price: 85,
      description: 'Treats acid reflux and heartburn',
      inStock: true,
      prescription: true,
      manufacturer: 'MediLife',
    },
    {
      id: 7,
      name: 'Multivitamin Complex',
      category: 'supplements',
      price: 450,
      description: 'Complete daily multivitamin',
      inStock: true,
      prescription: false,
      manufacturer: 'HealthPlus',
    },
    {
      id: 8,
      name: 'Antiseptic Solution',
      category: 'first-aid',
      price: 55,
      description: 'Wound cleaning solution',
      inStock: true,
      prescription: false,
      manufacturer: 'MedSupply',
    },
  ];

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         medicine.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOrder = (medicine) => {
    if (medicine.prescription) {
      alert(`${medicine.name} requires a prescription. Please upload your prescription or consult with a doctor.`);
    } else {
      alert(`${medicine.name} added to cart! Proceed to checkout to complete your order.`);
    }
  };

  return (
    <div className="pharmacy">
      <Header user={user} onLogout={onLogout} />
      
      <div className="container">
        <div className="page-header">
          <h2>
            <i className="fas fa-pills"></i>
            Online Pharmacy
          </h2>
          <p>Order medicines and healthcare products online</p>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search for medicines, supplements, or healthcare products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="categories-section">
          <h3>Categories</h3>
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

        {/* Info Banner */}
        <div className="info-banner">
          <div className="info-item">
            <i className="fas fa-truck"></i>
            <div>
              <strong>Free Delivery</strong>
              <p>On orders above ₹500</p>
            </div>
          </div>
          <div className="info-item">
            <i className="fas fa-shield-alt"></i>
            <div>
              <strong>100% Genuine</strong>
              <p>Authentic medicines</p>
            </div>
          </div>
          <div className="info-item">
            <i className="fas fa-clock"></i>
            <div>
              <strong>24/7 Service</strong>
              <p>Order anytime</p>
            </div>
          </div>
          <div className="info-item">
            <i className="fas fa-undo"></i>
            <div>
              <strong>Easy Returns</strong>
              <p>Hassle-free returns</p>
            </div>
          </div>
        </div>

        {/* Medicines Grid */}
        <div className="medicines-section">
          <h3>
            {selectedCategory === 'all' ? 'All Medicines' : categories.find(c => c.id === selectedCategory)?.name}
            <span className="count">({filteredMedicines.length} products)</span>
          </h3>
          
          {filteredMedicines.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-search"></i>
              <p>No medicines found</p>
              <small>Try adjusting your search or category filter</small>
            </div>
          ) : (
            <div className="medicines-grid">
              {filteredMedicines.map((medicine) => (
                <div key={medicine.id} className="medicine-card">
                  {medicine.prescription && (
                    <div className="prescription-badge">
                      <i className="fas fa-prescription"></i>
                      Rx Required
                    </div>
                  )}
                  <div className="medicine-icon">
                    <i className="fas fa-pills"></i>
                  </div>
                  <h4>{medicine.name}</h4>
                  <p className="manufacturer">{medicine.manufacturer}</p>
                  <p className="description">{medicine.description}</p>
                  <div className="medicine-footer">
                    <div className="price">₹{medicine.price}</div>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleOrder(medicine)}
                    >
                      <i className="fas fa-shopping-cart"></i>
                      Order Now
                    </button>
                  </div>
                  {medicine.inStock ? (
                    <div className="stock-status in-stock">
                      <i className="fas fa-check-circle"></i> In Stock
                    </div>
                  ) : (
                    <div className="stock-status out-of-stock">
                      <i className="fas fa-times-circle"></i> Out of Stock
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upload Prescription */}
        <div className="prescription-section">
          <div className="prescription-card">
            <div className="prescription-icon">
              <i className="fas fa-file-prescription"></i>
            </div>
            <div className="prescription-content">
              <h3>Have a Prescription?</h3>
              <p>Upload your prescription and we'll prepare your medicines</p>
              <button className="btn btn-secondary">
                <i className="fas fa-upload"></i>
                Upload Prescription
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pharmacy;
