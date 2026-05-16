// Medical Emergency System - Frontend JavaScript

const API_BASE = '../api';
let currentUser = null;
let userLocation = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    setupEventListeners();
    getUserLocation();
});

// Setup event listeners
function setupEventListeners() {
    // Login form
    document.getElementById('login-form')?.addEventListener('submit', handleLogin);
    
    // Register form
    document.getElementById('register-form')?.addEventListener('submit', handleRegister);
    
    // Emergency form
    document.getElementById('emergency-form')?.addEventListener('submit', handleEmergencySubmit);
}

// Check authentication
function checkAuth() {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user_data');
    
    if (token && user) {
        currentUser = JSON.parse(user);
        showDashboard();
    } else {
        showScreen('auth-screen');
    }
}

// Show/hide screens
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId)?.classList.add('active');
}

// Show/hide tabs
function showTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
    
    event.target.classList.add('active');
    document.getElementById(`${tabName}-form`).classList.add('active');
}

// Handle login
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
        const response = await fetch(`${API_BASE}/auth.php?action=login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('user_data', JSON.stringify(data.user));
            currentUser = data.user;
            showDashboard();
            showNotification('Login successful!', 'success');
        } else {
            showNotification(data.message, 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showNotification('Login failed. Please try again.', 'error');
    }
}

// Handle registration
async function handleRegister(e) {
    e.preventDefault();
    
    const userData = {
        full_name: document.getElementById('reg-name').value,
        email: document.getElementById('reg-email').value,
        phone: document.getElementById('reg-phone').value,
        blood_group: document.getElementById('reg-blood').value,
        password: document.getElementById('reg-password').value
    };
    
    try {
        const response = await fetch(`${API_BASE}/auth.php?action=register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Registration successful! Please login.', 'success');
            showTab('login');
            document.getElementById('register-form').reset();
        } else {
            showNotification(data.message, 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showNotification('Registration failed. Please try again.', 'error');
    }
}

// Show dashboard
function showDashboard() {
    showScreen('dashboard-screen');
    document.getElementById('user-name').textContent = currentUser.full_name;
    loadRecentAlerts();
}

// Logout
function logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    currentUser = null;
    showScreen('auth-screen');
    showNotification('Logged out successfully', 'success');
}

// Get user location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                console.log('Location obtained:', userLocation);
            },
            (error) => {
                console.error('Location error:', error);
                showNotification('Please enable location services for emergency features', 'warning');
            }
        );
    }
}

// Trigger emergency
function triggerEmergency() {
    if (!userLocation) {
        showNotification('Getting your location...', 'warning');
        getUserLocation();
        setTimeout(() => {
            if (userLocation) {
                openEmergencyModal();
            } else {
                showNotification('Location required for emergency alert', 'error');
            }
        }, 2000);
    } else {
        openEmergencyModal();
    }
}

// Open emergency modal
function openEmergencyModal() {
    document.getElementById('emergency-modal').classList.add('active');
}

// Close modal
function closeModal() {
    document.getElementById('emergency-modal').classList.remove('active');
}

// Handle emergency submission
async function handleEmergencySubmit(e) {
    e.preventDefault();
    
    if (!userLocation) {
        showNotification('Location required for emergency alert', 'error');
        return;
    }
    
    const alertData = {
        alert_type: document.getElementById('alert-type').value,
        severity: document.getElementById('severity').value,
        description: document.getElementById('description').value,
        latitude: userLocation.latitude,
        longitude: userLocation.longitude
    };
    
    try {
        const response = await fetch(`${API_BASE}/emergency.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            },
            body: JSON.stringify(alertData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Emergency alert sent! Help is on the way.', 'success');
            closeModal();
            document.getElementById('emergency-form').reset();
            loadRecentAlerts();
        } else {
            showNotification(data.message, 'error');
        }
    } catch (error) {
        console.error('Emergency alert error:', error);
        showNotification('Failed to send alert. Please try again.', 'error');
    }
}

// Load recent alerts
async function loadRecentAlerts() {
    try {
        const response = await fetch(`${API_BASE}/emergency.php?limit=5`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
        });
        
        const data = await response.json();
        
        if (data.success && data.alerts.length > 0) {
            displayAlerts(data.alerts);
        }
    } catch (error) {
        console.error('Load alerts error:', error);
    }
}

// Display alerts
function displayAlerts(alerts) {
    const container = document.getElementById('recent-alerts');
    container.innerHTML = '';
    
    alerts.forEach(alert => {
        const alertCard = document.createElement('div');
        alertCard.className = `alert-card ${alert.severity}`;
        alertCard.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div>
                    <strong>${alert.alert_type.toUpperCase()}</strong>
                    <span style="margin-left: 10px; padding: 2px 8px; background: rgba(0,0,0,0.1); border-radius: 4px; font-size: 12px;">
                        ${alert.severity}
                    </span>
                    <p style="margin: 5px 0; color: #7f8c8d;">${alert.description || 'No description'}</p>
                    <small style="color: #95a5a6;">
                        ${new Date(alert.created_at).toLocaleString()}
                    </small>
                </div>
                <div style="text-align: right;">
                    <span style="padding: 4px 12px; background: ${getStatusColor(alert.status)}; color: white; border-radius: 4px; font-size: 12px;">
                        ${alert.status}
                    </span>
                    ${alert.facility_name ? `<p style="margin-top: 5px; font-size: 12px;"><i class="fas fa-hospital"></i> ${alert.facility_name}</p>` : ''}
                </div>
            </div>
        `;
        container.appendChild(alertCard);
    });
}

// Get status color
function getStatusColor(status) {
    const colors = {
        'pending': '#f39c12',
        'acknowledged': '#3498db',
        'dispatched': '#9b59b6',
        'resolved': '#27ae60',
        'cancelled': '#95a5a6'
    };
    return colors[status] || '#95a5a6';
}

// Show notification
function showNotification(message, type = 'info') {
    // Simple alert for now - can be enhanced with toast notifications
    const colors = {
        'success': '#27ae60',
        'error': '#e74c3c',
        'warning': '#f39c12',
        'info': '#3498db'
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
