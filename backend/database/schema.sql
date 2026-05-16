-- Medical Emergency Management System Database Schema

CREATE DATABASE IF NOT EXISTS medical_emergency CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE medical_emergency;

-- Users Table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    blood_group VARCHAR(5),
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    profile_image VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_phone (phone),
    INDEX idx_location (latitude, longitude)
) ENGINE=InnoDB;

-- Healthcare Facilities Table
CREATE TABLE facilities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    type ENUM('hospital', 'clinic', 'pharmacy', 'diagnostic_center') NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    services TEXT,
    available_beds INT DEFAULT 0,
    has_emergency BOOLEAN DEFAULT TRUE,
    has_ambulance BOOLEAN DEFAULT FALSE,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    is_verified BOOLEAN DEFAULT FALSE,
    operating_hours JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_location (latitude, longitude),
    INDEX idx_emergency (has_emergency)
) ENGINE=InnoDB;

-- Emergency Alerts Table
CREATE TABLE emergency_alerts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    alert_type ENUM('medical', 'accident', 'cardiac', 'breathing', 'injury', 'other') NOT NULL,
    severity ENUM('low', 'medium', 'high', 'critical') NOT NULL,
    description TEXT,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    address TEXT,
    status ENUM('pending', 'acknowledged', 'dispatched', 'resolved', 'cancelled') DEFAULT 'pending',
    assigned_facility_id INT,
    assigned_ambulance_id INT,
    response_time INT,
    resolved_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_facility_id) REFERENCES facilities(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB;

-- Ambulances Table
CREATE TABLE ambulances (
    id INT PRIMARY KEY AUTO_INCREMENT,
    facility_id INT NOT NULL,
    vehicle_number VARCHAR(50) NOT NULL UNIQUE,
    driver_name VARCHAR(100) NOT NULL,
    driver_phone VARCHAR(20) NOT NULL,
    ambulance_type ENUM('basic', 'advanced', 'air') DEFAULT 'basic',
    status ENUM('available', 'on_duty', 'maintenance') DEFAULT 'available',
    current_latitude DECIMAL(10, 8),
    current_longitude DECIMAL(11, 8),
    equipment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (facility_id) REFERENCES facilities(id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_facility (facility_id)
) ENGINE=InnoDB;

-- Medical Records Table
CREATE TABLE medical_records (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    record_type ENUM('allergy', 'medication', 'condition', 'surgery', 'vaccination') NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    date_recorded DATE,
    document_path VARCHAR(255),
    is_critical BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_critical (is_critical)
) ENGINE=InnoDB;

-- Emergency Contacts Table
CREATE TABLE emergency_contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    contact_name VARCHAR(100) NOT NULL,
    relationship VARCHAR(50),
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id)
) ENGINE=InnoDB;

-- First Aid Tips Table
CREATE TABLE first_aid_tips (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(100) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    steps TEXT NOT NULL,
    warnings TEXT,
    image_url VARCHAR(255),
    video_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category)
) ENGINE=InnoDB;

-- Alert Notifications Table
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    alert_id INT,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('alert', 'update', 'reminder', 'info') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (alert_id) REFERENCES emergency_alerts(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_read (is_read)
) ENGINE=InnoDB;

-- Insert Sample Data
INSERT INTO facilities (name, type, phone, email, address, latitude, longitude, services, available_beds, has_emergency, has_ambulance, rating, is_verified) VALUES
('City General Hospital', 'hospital', '+1234567890', 'info@cityhospital.com', '123 Main Street, City Center', 40.7128, -74.0060, 'Emergency Care, Surgery, ICU, Cardiology', 50, TRUE, TRUE, 4.5, TRUE),
('MediCare Clinic', 'clinic', '+1234567891', 'contact@medicare.com', '456 Oak Avenue, Downtown', 40.7580, -73.9855, 'General Practice, Pediatrics, Vaccination', 0, FALSE, FALSE, 4.2, TRUE),
('24/7 Pharmacy Plus', 'pharmacy', '+1234567892', 'support@pharmacyplus.com', '789 Elm Street, West Side', 40.7489, -73.9680, 'Prescription Drugs, OTC Medications, Medical Supplies', 0, FALSE, FALSE, 4.0, TRUE);

INSERT INTO first_aid_tips (category, title, description, steps, warnings) VALUES
('Cardiac', 'CPR - Cardiopulmonary Resuscitation', 'Life-saving technique for cardiac arrest', '1. Call emergency services\n2. Place person on firm surface\n3. Position hands on center of chest\n4. Push hard and fast (100-120 compressions/min)\n5. Give 30 compressions, then 2 rescue breaths\n6. Continue until help arrives', 'Only perform if trained. Improper CPR can cause injury.'),
('Bleeding', 'Severe Bleeding Control', 'Stop severe bleeding to prevent shock', '1. Call emergency services\n2. Apply direct pressure with clean cloth\n3. Maintain pressure for 10-15 minutes\n4. Add more cloth if blood soaks through\n5. Elevate injured area above heart\n6. Apply pressure bandage when bleeding slows', 'Do not remove embedded objects. Seek immediate medical help.'),
('Choking', 'Heimlich Maneuver', 'Clear airway obstruction', '1. Stand behind person\n2. Make fist above navel\n3. Grasp fist with other hand\n4. Give quick upward thrusts\n5. Repeat until object dislodges\n6. Call emergency if unsuccessful', 'For infants, use back blows and chest thrusts instead.');
