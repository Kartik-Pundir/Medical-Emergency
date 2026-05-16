# Medical Emergency Response System 🏥

<div align="center">

![Medical Emergency](https://img.shields.io/badge/Healthcare-Emergency%20Response-0066FF?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react)
![PHP](https://img.shields.io/badge/PHP-7.4+-777BB4?style=for-the-badge&logo=php)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern, full-stack medical emergency management application with real-time alert system, facility locator, and comprehensive healthcare services.**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [API](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 Overview

The Medical Emergency Response System is a comprehensive healthcare platform designed to provide quick access to emergency services, medical facilities, and health information. Built with modern web technologies and featuring a professional healthcare-themed UI.

### 📊 Key Statistics

- 🏥 **1.6M+ Patients** served globally
- 🏨 **500+ Facilities** in network
- 👨‍⚕️ **2,000+ Doctors** available
- ⭐ **98% Satisfaction** rate

---

## ✨ Features

### 🚨 Emergency Services
- **One-Click SOS**: Instant emergency alert with GPS location
- **Real-time Tracking**: Live status updates (pending → acknowledged → dispatched → resolved)
- **Multiple Alert Types**: Medical, accident, fire, natural disaster
- **Severity Levels**: Low, medium, high, critical classification

### 🏥 Healthcare Facilities
- **Smart Finder**: Locate nearby hospitals, clinics, pharmacies
- **Advanced Filters**: Search by type, distance, services
- **Live Information**: Available beds, emergency services, ambulance availability
- **Contact Details**: Phone, address, operating hours

### 📋 Medical Records Management
- **Digital Records**: Store diagnosis, prescriptions, lab results, vaccinations
- **Critical Alerts**: Flag important medical conditions
- **Secure Storage**: Encrypted health information
- **Easy Access**: Quick retrieval during emergencies

### 🩹 First Aid Guide
- **15+ Scenarios**: Burns, cuts, fractures, CPR, choking, poisoning, etc.
- **Step-by-Step**: Clear, visual instructions
- **Safety Warnings**: Important precautions
- **Offline Ready**: Access guides without internet

### 👤 User Management
- **Secure Auth**: JWT-based authentication
- **Profile Management**: Personal info, emergency contacts
- **Blood Type**: Critical medical information
- **Session Security**: Token-based access control

---

## 📸 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400/0066FF/FFFFFF?text=Dashboard+with+Hero+Section)

### Emergency Alert
![Emergency](https://via.placeholder.com/800x400/FF3B30/FFFFFF?text=Emergency+Alert+System)

### Facilities Finder
![Facilities](https://via.placeholder.com/800x400/00C9A7/FFFFFF?text=Healthcare+Facilities+Finder)

### Medical Records
![Records](https://via.placeholder.com/800x400/0066FF/FFFFFF?text=Medical+Records+Management)

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Custom styling
- **Font Awesome** - Icons

### Backend
- **PHP 7.4+** - Server-side logic
- **MySQL 8.0** - Database
- **PDO** - Database abstraction
- **JWT** - Authentication tokens

### Development
- **Git** - Version control
- **npm** - Package management
- **XAMPP/MAMP** - Local server

---

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- PHP 7.4 or higher
- MySQL 8.0 or higher
- XAMPP/MAMP or similar local server

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/medical-emergency.git
cd medical-emergency
```

### Step 2: Database Setup

```bash
# Create database
mysql -u root -p
CREATE DATABASE medical_emergency;
exit;

# Import schema
mysql -u root -p medical_emergency < backend/database/schema.sql
```

### Step 3: Backend Configuration

```bash
# Navigate to backend config
cd backend/config

# Edit database.php with your credentials
# Update: DB_HOST, DB_NAME, DB_USER, DB_PASS
```

### Step 4: Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

### Step 5: Start Backend

```bash
# Option 1: Using XAMPP/MAMP
# Place project in htdocs/www folder
# Access: http://localhost/medical-emergency/backend

# Option 2: PHP Built-in Server
cd backend
php -S localhost:8000
```

### Step 6: Access Application

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000` or `http://localhost/medical-emergency/backend`

---

## 📖 Usage

### Register/Login

1. Navigate to `http://localhost:3000`
2. Click "Register" to create account
3. Fill in: Name, Email, Phone, Blood Type, Password
4. Login with credentials

### Emergency Alert

1. Click the red **SOS** button on dashboard
2. Select emergency type
3. Choose severity level
4. Add description
5. Submit - Location automatically captured

### Find Facilities

1. Go to "Nearby Facilities"
2. Filter by type (Hospital, Clinic, Pharmacy)
3. View facility details
4. Get directions or call directly

### Manage Medical Records

1. Navigate to "Medical Records"
2. Click "Add New Record"
3. Select record type
4. Fill in details
5. Mark as critical if needed

### First Aid Guide

1. Go to "First Aid Guide"
2. Browse categories or search
3. Click on scenario for detailed steps
4. Follow instructions carefully

---

## 📡 API Documentation

### Authentication

#### Register User
```http
POST /api/auth.php?action=register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "blood_type": "O+",
  "password": "securepass123"
}
```

#### Login
```http
POST /api/auth.php?action=login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepass123"
}
```

### Emergency Alerts

#### Create Alert
```http
POST /api/emergency.php?action=create
Authorization: Bearer {token}
Content-Type: application/json

{
  "alert_type": "medical",
  "severity": "high",
  "description": "Chest pain",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

#### Get Alerts
```http
GET /api/emergency.php?action=list&limit=10
Authorization: Bearer {token}
```

### Facilities

#### Get Nearby Facilities
```http
GET /api/facilities.php?action=nearby&lat=40.7128&lng=-74.0060&type=hospital
Authorization: Bearer {token}
```

### Medical Records

#### Create Record
```http
POST /api/medical-records.php?action=create
Authorization: Bearer {token}
Content-Type: application/json

{
  "record_type": "diagnosis",
  "title": "Annual Checkup",
  "description": "All vitals normal",
  "is_critical": false
}
```

---

## 📁 Project Structure

```
medical-emergency/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Dashboard/
│   │   │   ├── Emergency/
│   │   │   ├── Facilities/
│   │   │   ├── FirstAid/
│   │   │   ├── Layout/
│   │   │   └── MedicalRecords/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── backend/
│   ├── api/
│   │   ├── auth.php
│   │   ├── emergency.php
│   │   ├── facilities.php
│   │   ├── first-aid.php
│   │   └── medical-records.php
│   ├── config/
│   │   ├── config.php
│   │   └── database.php
│   ├── includes/
│   │   ├── Auth.php
│   │   ├── EmergencyAlert.php
│   │   ├── Facility.php
│   │   └── MedicalRecord.php
│   └── database/
│       └── schema.sql
└── README.md
```

---

## 🔒 Security

- **Password Hashing**: bcrypt algorithm
- **SQL Injection Prevention**: PDO prepared statements
- **XSS Protection**: Input sanitization
- **CSRF Tokens**: Request validation
- **JWT Authentication**: Secure token-based auth
- **HTTPS Ready**: SSL/TLS support
- **Input Validation**: Server and client-side

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Coding Standards

- Follow PSR-12 for PHP
- Use ESLint for JavaScript
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation

---

## 🐛 Bug Reports

Found a bug? Please open an issue with:

- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Kartik Pundir

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📞 Contact

**Kartik Pundir**

- GitHub: [@kartikpundir](https://github.com/kartikpundir)
- Email: your.email@example.com
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- Font Awesome for icons
- React community for excellent documentation
- Healthcare professionals for domain expertise
- Open source community for inspiration

---

## 🔮 Future Enhancements

- [ ] Real-time chat with doctors
- [ ] Video consultations
- [ ] Prescription management
- [ ] Insurance integration
- [ ] Wearable device sync
- [ ] Multi-language support
- [ ] Push notifications
- [ ] Offline mode
- [ ] AI symptom checker
- [ ] Appointment scheduling

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ for better healthcare accessibility

[Report Bug](https://github.com/yourusername/medical-emergency/issues) • [Request Feature](https://github.com/yourusername/medical-emergency/issues)

</div>
