-- ============================================
-- Serenity Spa & Massage - Database Schema
-- Business: 123 Sbhekuza Avenue, Ndlela Building, Sandton, 1635
-- Office: 011 123 4567
-- Developer: Ntlantla Mabindisa (NMAB TECH SERVICES)
-- ============================================

-- Create database
CREATE DATABASE IF NOT EXISTS serenity_spa;
USE serenity_spa;

-- ============================================
-- Table: users
-- Stores all user accounts (clients, managers, admins)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('client', 'manager', 'admin') DEFAULT 'client',
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    loyalty_points INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    reset_token VARCHAR(100) NULL,
    reset_token_expiry TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Table: massages
-- Available massage services and their details
-- ============================================
CREATE TABLE IF NOT EXISTS massages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    duration INT NOT NULL COMMENT 'Duration in minutes',
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255),
    category VARCHAR(50),
    benefits TEXT COMMENT 'Health benefits description',
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Table: time_slots
-- Available time slots for bookings
-- ============================================
CREATE TABLE IF NOT EXISTS time_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slot_time TIME NOT NULL,
    max_bookings INT DEFAULT 5 COMMENT 'Maximum bookings per slot per day',
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_slot (slot_time),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Table: bookings
-- Customer appointment bookings
-- ============================================
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    massage_id INT NOT NULL,
    booking_date DATE NOT NULL,
    time_slot_id INT NOT NULL,
    status ENUM('pending', 'confirmed', 'checked_in', 'completed', 'cancelled', 'no_show') DEFAULT 'pending',
    total_amount DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    final_amount DECIMAL(10, 2) NOT NULL,
    special_id INT NULL COMMENT 'Applied special offer',
    payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
    payment_method VARCHAR(50),
    payment_reference VARCHAR(100),
    notes TEXT,
    checked_in_at TIMESTAMP NULL,
    checked_out_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    cancelled_at TIMESTAMP NULL,
    cancellation_reason TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (massage_id) REFERENCES massages(id) ON DELETE CASCADE,
    FOREIGN KEY (time_slot_id) REFERENCES time_slots(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_booking_date (booking_date),
    INDEX idx_status (status),
    INDEX idx_payment_status (payment_status),
    INDEX idx_date_slot (booking_date, time_slot_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Table: reviews
-- Customer reviews and ratings
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    booking_id INT NOT NULL,
    massage_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    moderated_by INT NULL COMMENT 'Manager/Admin who moderated',
    moderated_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (massage_id) REFERENCES massages(id) ON DELETE CASCADE,
    FOREIGN KEY (moderated_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_massage (massage_id),
    INDEX idx_rating (rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Table: specials
-- Promotional offers and discounts (Manager controlled)
-- ============================================
CREATE TABLE IF NOT EXISTS specials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    discount_type ENUM('percentage', 'fixed') DEFAULT 'percentage',
    discount_value DECIMAL(10, 2) NOT NULL,
    massage_id INT NULL COMMENT 'Specific massage or NULL for all',
    min_purchase DECIMAL(10, 2) DEFAULT 0.00,
    max_uses INT NULL COMMENT 'Maximum total uses',
    uses_count INT DEFAULT 0,
    valid_from DATE NOT NULL,
    valid_until DATE NOT NULL,
    published BOOLEAN DEFAULT FALSE COMMENT 'Manager controls visibility to customers',
    status ENUM('active', 'inactive', 'expired') DEFAULT 'active',
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (massage_id) REFERENCES massages(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_published (published),
    INDEX idx_dates (valid_from, valid_until)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Table: payments
-- Payment transaction records
-- ============================================
CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_gateway VARCHAR(50) DEFAULT 'ozow',
    transaction_id VARCHAR(100) UNIQUE,
    gateway_reference VARCHAR(100),
    status ENUM('pending', 'processing', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    payment_date TIMESTAMP NULL,
    refund_date TIMESTAMP NULL,
    refund_amount DECIMAL(10, 2) NULL,
    refund_reason TEXT,
    metadata JSON COMMENT 'Additional payment gateway data',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_transaction (transaction_id),
    INDEX idx_status (status),
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Table: loyalty_transactions
-- Loyalty points transaction history
-- ============================================
CREATE TABLE IF NOT EXISTS loyalty_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    booking_id INT NULL,
    points INT NOT NULL COMMENT 'Positive for earning, negative for spending',
    transaction_type ENUM('earned', 'redeemed', 'expired', 'adjusted') NOT NULL,
    description VARCHAR(255),
    balance_after INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_type (transaction_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Table: notifications
-- System notifications for users
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('booking', 'payment', 'review', 'promotion', 'system') DEFAULT 'system',
    is_read BOOLEAN DEFAULT FALSE,
    related_id INT NULL COMMENT 'Related booking/payment/review ID',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_read (user_id, is_read),
    INDEX idx_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Table: audit_log
-- System audit trail for important actions
-- ============================================
CREATE TABLE IF NOT EXISTS audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL COMMENT 'booking, user, massage, special, etc.',
    entity_id INT NOT NULL,
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_action (action)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- Insert Default Time Slots (9 AM - 6 PM)
-- ============================================
INSERT INTO time_slots (slot_time, max_bookings) VALUES
('09:00:00', 5),
('10:00:00', 5),
('11:00:00', 5),
('12:00:00', 5),
('13:00:00', 5),
('14:00:00', 5),
('15:00:00', 5),
('16:00:00', 5),
('17:00:00', 5),
('18:00:00', 5);

-- ============================================
-- Insert Default Users
-- ============================================
INSERT INTO users (name, email, password, phone, role, status) VALUES
('Admin User', 'admin@serenityspa.co.za', 'admin123', '0111234567', 'admin', 'active'),
('Manager User', 'manager@serenityspa.co.za', 'manager123', '0111234567', 'manager', 'active'),
('John Doe', 'client@example.com', 'client123', '0821234567', 'client', 'active');

-- ============================================
-- Insert Sample Massage Services
-- ============================================
INSERT INTO massages (name, description, duration, price, category, benefits, status) VALUES
('Swedish Massage', 'A gentle, relaxing full-body massage using long strokes, kneading, and circular movements. Perfect for stress relief and muscle tension.', 60, 450.00, 'Relaxation', 'Reduces stress, improves circulation, promotes relaxation, eases muscle tension', 'active'),
('Deep Tissue Massage', 'Targets deeper layers of muscles and connective tissue. Ideal for chronic aches and pains, contracted areas such as stiff neck, upper back, and leg muscle tightness.', 60, 550.00, 'Therapeutic', 'Relieves chronic pain, improves posture, breaks up scar tissue, reduces inflammation', 'active'),
('Hot Stone Massage', 'Smooth, heated stones are placed on specific points on the body and used as massage tools. The heat helps muscles relax and improves blood flow.', 90, 650.00, 'Luxury', 'Deep relaxation, eases muscle stiffness, improves circulation, reduces stress', 'active'),
('Aromatherapy Massage', 'Combines gentle massage with essential oils chosen for their therapeutic properties. Enhances both physical and emotional wellbeing.', 60, 500.00, 'Holistic', 'Mood enhancement, stress relief, improved sleep, pain relief, immune boost', 'active'),
('Sports Massage', 'Designed for athletes and active individuals. Focuses on preventing and treating injuries, improving flexibility, and enhancing athletic performance.', 60, 600.00, 'Therapeutic', 'Prevents injuries, improves flexibility, enhances performance, speeds recovery', 'active'),
('Thai Massage', 'Ancient healing technique combining acupressure, assisted yoga postures, and deep stretching. Performed on a mat on the floor with client fully clothed.', 90, 700.00, 'Traditional', 'Increases flexibility, relieves tension, improves energy flow, enhances mental clarity', 'active');

-- ============================================
-- Insert Sample Special Offers (Hidden by default)
-- ============================================
INSERT INTO specials (title, description, discount_type, discount_value, valid_from, valid_until, published, status, created_by) VALUES
('Black Friday Special', '50% off all massage services! Limited time offer.', 'percentage', 50.00, '2024-11-25', '2024-11-30', FALSE, 'active', 2),
('New Client Special', 'First-time clients receive 20% off any massage service!', 'percentage', 20.00, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 3 MONTH), TRUE, 'active', 2),
('Midweek Relaxation', 'Book any massage Monday to Thursday and save 15%', 'percentage', 15.00, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 MONTH), TRUE, 'active', 2);

-- ============================================
-- Insert Sample Reviews
-- ============================================
INSERT INTO reviews (user_id, booking_id, massage_id, rating, comment, status, created_at) VALUES
(3, 1, 1, 5, 'Absolutely amazing experience! The therapist was professional and the Swedish massage was exactly what I needed. Will definitely be back!', 'approved', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(3, 2, 3, 5, 'The hot stone massage was heavenly. The atmosphere at Serenity Spa is so peaceful and relaxing. Highly recommend!', 'approved', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(3, 3, 4, 4, 'Great aromatherapy massage. The essential oils were wonderful and I left feeling completely refreshed. Only minor point - would have liked it a bit longer!', 'approved', DATE_SUB(NOW(), INTERVAL 1 DAY));

-- ============================================
-- Create Views for Reporting
-- ============================================

-- Daily bookings summary
CREATE OR REPLACE VIEW daily_bookings_summary AS
SELECT 
    booking_date,
    COUNT(*) as total_bookings,
    SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_bookings,
    SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_bookings,
    SUM(final_amount) as total_revenue,
    AVG(final_amount) as average_booking_value
FROM bookings
GROUP BY booking_date
ORDER BY booking_date DESC;

-- Popular massage services
CREATE OR REPLACE VIEW popular_massages AS
SELECT 
    m.id,
    m.name,
    m.price,
    COUNT(b.id) as booking_count,
    AVG(r.rating) as average_rating,
    SUM(b.final_amount) as total_revenue
FROM massages m
LEFT JOIN bookings b ON m.id = b.massage_id
LEFT JOIN reviews r ON m.id = r.massage_id AND r.status = 'approved'
GROUP BY m.id, m.name, m.price
ORDER BY booking_count DESC;

-- Customer statistics
CREATE OR REPLACE VIEW customer_statistics AS
SELECT 
    u.id,
    u.name,
    u.email,
    u.loyalty_points,
    COUNT(b.id) as total_bookings,
    SUM(b.final_amount) as total_spent,
    AVG(r.rating) as average_rating_given,
    MAX(b.booking_date) as last_booking_date
FROM users u
LEFT JOIN bookings b ON u.id = b.user_id
LEFT JOIN reviews r ON u.id = r.user_id
WHERE u.role = 'client'
GROUP BY u.id, u.name, u.email, u.loyalty_points;

-- Published special offers (visible to customers)
CREATE OR REPLACE VIEW published_specials AS
SELECT 
    id,
    title,
    description,
    discount_type,
    discount_value,
    valid_from,
    valid_until
FROM specials
WHERE published = TRUE 
    AND status = 'active'
    AND CURDATE() BETWEEN valid_from AND valid_until
ORDER BY discount_value DESC;

-- ============================================
-- Create Stored Procedures
-- ============================================

DELIMITER //

-- Procedure to check available slots for a specific date
CREATE PROCEDURE check_available_slots(IN check_date DATE)
BEGIN
    SELECT 
        ts.id,
        ts.slot_time,
        ts.max_bookings,
        COUNT(b.id) as current_bookings,
        (ts.max_bookings - COUNT(b.id)) as available_slots
    FROM time_slots ts
    LEFT JOIN bookings b ON ts.id = b.time_slot_id 
        AND b.booking_date = check_date 
        AND b.status NOT IN ('cancelled', 'no_show')
    WHERE ts.status = 'active'
    GROUP BY ts.id, ts.slot_time, ts.max_bookings
    HAVING available_slots > 0
    ORDER BY ts.slot_time;
END //

-- Procedure to calculate loyalty points
CREATE PROCEDURE add_loyalty_points(
    IN p_user_id INT,
    IN p_booking_id INT,
    IN p_amount DECIMAL(10,2)
)
BEGIN
    DECLARE points INT;
    SET points = FLOOR(p_amount / 10); -- 1 point per R10
    
    -- Update user points
    UPDATE users 
    SET loyalty_points = loyalty_points + points 
    WHERE id = p_user_id;
    
    -- Record transaction
    INSERT INTO loyalty_transactions (user_id, booking_id, points, transaction_type, description, balance_after)
    SELECT p_user_id, p_booking_id, points, 'earned', 
           CONCAT('Earned from booking #', p_booking_id),
           loyalty_points
    FROM users WHERE id = p_user_id;
END //

DELIMITER ;

-- ============================================
-- Create Triggers
-- ============================================

DELIMITER //

-- Trigger to update booking count when special is used
CREATE TRIGGER after_booking_insert
AFTER INSERT ON bookings
FOR EACH ROW
BEGIN
    IF NEW.special_id IS NOT NULL THEN
        UPDATE specials 
        SET uses_count = uses_count + 1 
        WHERE id = NEW.special_id;
    END IF;
END //

-- Trigger to expire old specials
CREATE TRIGGER before_special_check
BEFORE UPDATE ON specials
FOR EACH ROW
BEGIN
    IF NEW.valid_until < CURDATE() AND NEW.status = 'active' THEN
        SET NEW.status = 'expired';
    END IF;
END //

-- Trigger to log special offer changes
CREATE TRIGGER after_special_update
AFTER UPDATE ON specials
FOR EACH ROW
BEGIN
    IF OLD.published != NEW.published OR OLD.valid_from != NEW.valid_from OR OLD.valid_until != NEW.valid_until THEN
        INSERT INTO audit_log (user_id, action, entity_type, entity_id, old_values, new_values)
        VALUES (
            NEW.created_by,
            'special_updated',
            'special',
            NEW.id,
            JSON_OBJECT('published', OLD.published, 'valid_from', OLD.valid_from, 'valid_until', OLD.valid_until),
            JSON_OBJECT('published', NEW.published, 'valid_from', NEW.valid_from, 'valid_until', NEW.valid_until)
        );
    END IF;
END //

DELIMITER ;

-- ============================================
-- Create Indexes for Performance
-- ============================================
CREATE INDEX idx_bookings_date_status ON bookings(booking_date, status);
CREATE INDEX idx_reviews_massage_status ON reviews(massage_id, status);
CREATE INDEX idx_users_role_status ON users(role, status);
CREATE INDEX idx_payments_date ON payments(payment_date);

-- ============================================
-- Grant Permissions (adjust as needed)
-- ============================================
-- CREATE USER 'spa_admin'@'localhost' IDENTIFIED BY 'secure_password_here';
-- GRANT ALL PRIVILEGES ON serenity_spa.* TO 'spa_admin'@'localhost';
-- FLUSH PRIVILEGES;

-- ============================================
-- Database Schema Complete
-- Developer: Ntlantla Mabindisa
-- Company: NMAB TECH SERVICES
-- Contact: mabindisantla92@gmail.com | +27 60 229 0710
-- ============================================
