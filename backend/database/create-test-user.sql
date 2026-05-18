-- Create Test User for Sign-In Testing
-- Password: password

USE medical_emergency;

-- Delete existing test user if exists
DELETE FROM users WHERE email = 'test@example.com';

-- Insert test user
-- Password hash for 'password' using bcrypt
INSERT INTO users (
    full_name, 
    email, 
    phone, 
    password_hash, 
    blood_group,
    gender,
    is_active,
    created_at
) VALUES (
    'Test User',
    'test@example.com',
    '1234567890',
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'O+',
    'male',
    TRUE,
    NOW()
);

-- Verify the user was created
SELECT id, full_name, email, phone, is_active, created_at 
FROM users 
WHERE email = 'test@example.com';

-- Display test credentials
SELECT 
    '==================================' as '',
    'Test User Created Successfully!' as '',
    '==================================' as '',
    '' as '',
    'Login Credentials:' as '',
    '  Email: test@example.com' as '',
    '  Password: password' as '',
    '' as '';
