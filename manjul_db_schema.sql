-- =====================================================
-- MANJUL ICE POPS DATABASE - Complete Schema
-- Database: manjul_db
-- Purpose: Track inventory, production, and sales
-- =====================================================

-- Create Database
CREATE DATABASE IF NOT EXISTS manjul_db;
USE manjul_db;

-- =====================================================
-- TABLE 1: PRODUCTS
-- =====================================================
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL UNIQUE,
    category ENUM('Ice Pop', 'Lassi', 'Orange Juice') NOT NULL,
    cost_price DECIMAL(10, 2) NOT NULL,
    selling_price DECIMAL(10, 2) NOT NULL,
    quantity_unit VARCHAR(50) DEFAULT 'Piece', -- e.g., Piece, Liter, Bottle
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE 2: EMPLOYEES
-- =====================================================
CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone_number VARCHAR(15),
    position VARCHAR(50), -- e.g., Sales Executive, Production Manager
    salary DECIMAL(12, 2),
    hire_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE 3: PRODUCTION BATCHES
-- =====================================================
CREATE TABLE production_batches (
    batch_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    production_date DATE NOT NULL,
    quantity_produced INT NOT NULL,
    cost_per_unit DECIMAL(10, 2),
    batch_notes TEXT,
    produced_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (produced_by) REFERENCES employees(employee_id)
);

-- =====================================================
-- TABLE 4: INVENTORY
-- =====================================================
CREATE TABLE inventory (
    inventory_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL UNIQUE,
    quantity_in_stock INT DEFAULT 0,
    quantity_sold INT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- =====================================================
-- TABLE 5: CUSTOMERS
-- =====================================================
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone_number VARCHAR(15),
    address VARCHAR(255),
    city VARCHAR(50),
    state VARCHAR(50),
    zip_code VARCHAR(10),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE 6: SALES ORDERS
-- =====================================================
CREATE TABLE sales_orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    employee_id INT NOT NULL,
    order_date DATE NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    payment_status ENUM('Pending', 'Paid', 'Partial') DEFAULT 'Pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

-- =====================================================
-- TABLE 7: SALES ORDER ITEMS
-- =====================================================
CREATE TABLE sales_order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    batch_id INT,
    quantity_sold INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    line_total DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES sales_orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (batch_id) REFERENCES production_batches(batch_id)
);

-- =====================================================
-- TABLE 8: DAILY PRODUCTION SUMMARY
-- =====================================================
CREATE TABLE daily_production_summary (
    summary_id INT AUTO_INCREMENT PRIMARY KEY,
    production_date DATE NOT NULL UNIQUE,
    total_quantity_produced INT DEFAULT 0,
    total_production_cost DECIMAL(12, 2) DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLE 9: DAILY SALES SUMMARY
-- =====================================================
CREATE TABLE daily_sales_summary (
    summary_id INT AUTO_INCREMENT PRIMARY KEY,
    sales_date DATE NOT NULL UNIQUE,
    total_orders INT DEFAULT 0,
    total_quantity_sold INT DEFAULT 0,
    total_sales_amount DECIMAL(12, 2) DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX idx_product_category ON products(category);
CREATE INDEX idx_employee_position ON employees(position);
CREATE INDEX idx_batch_product ON production_batches(product_id);
CREATE INDEX idx_batch_date ON production_batches(production_date);
CREATE INDEX idx_order_customer ON sales_orders(customer_id);
CREATE INDEX idx_order_employee ON sales_orders(employee_id);
CREATE INDEX idx_order_date ON sales_orders(order_date);
CREATE INDEX idx_order_item_product ON sales_order_items(product_id);
CREATE INDEX idx_production_summary_date ON daily_production_summary(production_date);
CREATE INDEX idx_sales_summary_date ON daily_sales_summary(sales_date);

-- =====================================================
-- SAMPLE DATA - PRODUCTS
-- =====================================================
INSERT INTO products (product_name, category, cost_price, selling_price, quantity_unit, description) VALUES
('Mango Ice Pop', 'Ice Pop', 5.00, 10.00, 'Piece', 'Refreshing mango flavored ice pop'),
('Strawberry Ice Pop', 'Ice Pop', 4.50, 9.00, 'Piece', 'Sweet strawberry flavored ice pop'),
('Chocolate Ice Pop', 'Ice Pop', 5.50, 11.00, 'Piece', 'Rich chocolate flavored ice pop'),
('Mango Lassi', 'Lassi', 15.00, 30.00, 'Liter', 'Traditional mango flavored lassi'),
('Sweet Lassi', 'Lassi', 12.00, 25.00, 'Liter', 'Classic sweet yogurt lassi'),
('Orange Juice', 'Orange Juice', 20.00, 40.00, 'Liter', 'Fresh squeezed orange juice');

-- =====================================================
-- SAMPLE DATA - EMPLOYEES
-- =====================================================
INSERT INTO employees (employee_name, email, phone_number, position, salary, hire_date, is_active) VALUES
('Raj Kumar', 'raj.kumar@manjul.com', '9876543210', 'Sales Executive', 25000.00, '2023-01-15', TRUE),
('Priya Singh', 'priya.singh@manjul.com', '9876543211', 'Sales Executive', 24000.00, '2023-02-01', TRUE),
('Amit Patel', 'amit.patel@manjul.com', '9876543212', 'Production Manager', 35000.00, '2022-06-10', TRUE),
('Neha Sharma', 'neha.sharma@manjul.com', '9876543213', 'Sales Executive', 24000.00, '2023-03-20', TRUE),
('Rohan Gupta', 'rohan.gupta@manjul.com', '9876543214', 'Inventory Manager', 28000.00, '2023-01-01', TRUE);

-- =====================================================
-- SAMPLE DATA - CUSTOMERS
-- =====================================================
INSERT INTO customers (customer_name, email, phone_number, address, city, state, zip_code, is_active) VALUES
('ABC Retail Store', 'abc.retail@email.com', '9900112233', '123 Market Street', 'Delhi', 'Delhi', '110001', TRUE),
('XYZ Super Market', 'xyz.supermarket@email.com', '9900112234', '456 Shopping Complex', 'Mumbai', 'Maharashtra', '400001', TRUE),
('Quick Mart Chain', 'quickmart@email.com', '9900112235', '789 Business Park', 'Bangalore', 'Karnataka', '560001', TRUE),
('Local Kirana Shop', 'kirana@email.com', '9900112236', '321 Community Center', 'Delhi', 'Delhi', '110002', TRUE),
('City Mall Food Court', 'citymall@email.com', '9900112237', '654 Shopping Mall', 'Pune', 'Maharashtra', '411001', TRUE);

-- =====================================================
-- SAMPLE DATA - PRODUCTION BATCHES
-- =====================================================
INSERT INTO production_batches (product_id, production_date, quantity_produced, cost_per_unit, batch_notes, produced_by) VALUES
(1, '2025-12-10', 500, 5.00, 'Morning batch - Good quality', 3),
(2, '2025-12-10', 400, 4.50, 'Morning batch - Good quality', 3),
(3, '2025-12-10', 300, 5.50, 'Morning batch', 3),
(4, '2025-12-10', 100, 15.00, 'Mango lassi production', 3),
(5, '2025-12-10', 80, 12.00, 'Sweet lassi production', 3),
(6, '2025-12-10', 120, 20.00, 'Orange juice batch', 3),
(1, '2025-12-11', 600, 5.00, 'Afternoon batch - High demand', 3),
(2, '2025-12-11', 450, 4.50, 'Afternoon batch', 3),
(4, '2025-12-11', 90, 15.00, 'Mango lassi - Refill', 3),
(6, '2025-12-11', 100, 20.00, 'Orange juice - Refill', 3);

-- =====================================================
-- SAMPLE DATA - INVENTORY
-- =====================================================
INSERT INTO inventory (product_id, quantity_in_stock, quantity_sold) VALUES
(1, 1050, 50),
(2, 800, 50),
(3, 300, 0),
(4, 190, 0),
(5, 80, 0),
(6, 220, 0);

-- =====================================================
-- SAMPLE DATA - SALES ORDERS
-- =====================================================
INSERT INTO sales_orders (customer_id, employee_id, order_date, total_amount, payment_status, notes) VALUES
(1, 1, '2025-12-10', 2500.00, 'Paid', 'Regular weekly order'),
(2, 2, '2025-12-10', 3200.00, 'Paid', 'Monthly supply order'),
(3, 1, '2025-12-11', 1800.00, 'Pending', 'Rush order for weekend'),
(4, 3, '2025-12-11', 900.00, 'Paid', 'Small retail order'),
(5, 2, '2025-12-11', 2100.00, 'Partial', 'Food court weekly order');

-- =====================================================
-- SAMPLE DATA - SALES ORDER ITEMS
-- =====================================================
INSERT INTO sales_order_items (order_id, product_id, batch_id, quantity_sold, unit_price, line_total) VALUES
(1, 1, 1, 100, 10.00, 1000.00),
(1, 2, 2, 75, 9.00, 675.00),
(1, 4, 4, 25, 30.00, 750.00),
(1, 6, 6, 10, 40.00, 400.00),
(2, 1, 1, 80, 10.00, 800.00),
(2, 3, 3, 60, 11.00, 660.00),
(2, 4, 4, 40, 30.00, 1200.00),
(2, 5, 5, 20, 25.00, 500.00),
(3, 2, 7, 100, 9.00, 900.00),
(3, 6, 6, 22, 40.00, 880.00),
(4, 1, 1, 50, 10.00, 500.00),
(4, 5, 5, 16, 25.00, 400.00),
(5, 2, 8, 90, 9.00, 810.00),
(5, 3, 3, 50, 11.00, 550.00),
(5, 4, 8, 20, 30.00, 600.00),
(5, 6, 10, 12, 40.00, 480.00);

-- =====================================================
-- UPDATE INVENTORY WITH SOLD QUANTITIES
-- =====================================================
UPDATE inventory SET quantity_sold = 50 WHERE product_id = 1;
UPDATE inventory SET quantity_sold = 50 WHERE product_id = 2;

-- =====================================================
-- VIEWS FOR REPORTING
-- =====================================================

-- View 1: Employee-wise Sales Summary
CREATE VIEW employee_sales_summary AS
SELECT 
    e.employee_id,
    e.employee_name,
    COUNT(DISTINCT so.order_id) as total_orders,
    SUM(soi.quantity_sold) as total_quantity_sold,
    SUM(soi.line_total) as total_revenue
FROM employees e
LEFT JOIN sales_orders so ON e.employee_id = so.employee_id
LEFT JOIN sales_order_items soi ON so.order_id = soi.order_id
WHERE e.is_active = TRUE
GROUP BY e.employee_id, e.employee_name;

-- View 2: Product-wise Sales Summary
CREATE VIEW product_sales_summary AS
SELECT 
    p.product_id,
    p.product_name,
    p.category,
    p.selling_price,
    i.quantity_in_stock,
    SUM(soi.quantity_sold) as total_sold,
    (i.quantity_in_stock + SUM(soi.quantity_sold)) as total_produced,
    (i.quantity_in_stock + SUM(soi.quantity_sold)) * p.cost_price as production_cost,
    SUM(soi.line_total) as total_revenue,
    (SUM(soi.line_total) - ((i.quantity_in_stock + SUM(soi.quantity_sold)) * p.cost_price)) as gross_profit
FROM products p
LEFT JOIN inventory i ON p.product_id = i.product_id
LEFT JOIN sales_order_items soi ON p.product_id = soi.product_id
WHERE p.is_active = TRUE
GROUP BY p.product_id, p.product_name, p.category, p.selling_price, i.quantity_in_stock;

-- View 3: Customer Purchase Summary
CREATE VIEW customer_purchase_summary AS
SELECT 
    c.customer_id,
    c.customer_name,
    c.city,
    COUNT(DISTINCT so.order_id) as total_orders,
    SUM(soi.quantity_sold) as total_quantity_purchased,
    SUM(so.total_amount) as total_purchase_value
FROM customers c
LEFT JOIN sales_orders so ON c.customer_id = so.customer_id
LEFT JOIN sales_order_items soi ON so.order_id = soi.order_id
WHERE c.is_active = TRUE
GROUP BY c.customer_id, c.customer_name, c.city;

-- View 4: Daily Stock Status
CREATE VIEW daily_stock_status AS
SELECT 
    p.product_id,
    p.product_name,
    p.category,
    i.quantity_in_stock as available_stock,
    i.quantity_sold as total_sold,
    (SELECT SUM(quantity_produced) FROM production_batches WHERE product_id = p.product_id) as total_produced
FROM products p
LEFT JOIN inventory i ON p.product_id = i.product_id
WHERE p.is_active = TRUE
ORDER BY i.quantity_in_stock DESC;

-- =====================================================
-- STORED PROCEDURES
-- =====================================================

-- Procedure 1: Add Production Batch and Update Inventory
DELIMITER //
CREATE PROCEDURE add_production_batch(
    IN p_product_id INT,
    IN p_production_date DATE,
    IN p_quantity_produced INT,
    IN p_cost_per_unit DECIMAL(10,2),
    IN p_produced_by INT,
    IN p_batch_notes TEXT
)
BEGIN
    INSERT INTO production_batches (product_id, production_date, quantity_produced, cost_per_unit, produced_by, batch_notes)
    VALUES (p_product_id, p_production_date, p_quantity_produced, p_cost_per_unit, p_produced_by, p_batch_notes);
    
    UPDATE inventory SET quantity_in_stock = quantity_in_stock + p_quantity_produced
    WHERE product_id = p_product_id;
END//
DELIMITER ;

-- Procedure 2: Record Sales and Update Inventory
DELIMITER //
CREATE PROCEDURE record_sale(
    IN p_order_id INT,
    IN p_product_id INT,
    IN p_batch_id INT,
    IN p_quantity_sold INT,
    IN p_unit_price DECIMAL(10,2)
)
BEGIN
    DECLARE line_total DECIMAL(12,2);
    SET line_total = p_quantity_sold * p_unit_price;
    
    INSERT INTO sales_order_items (order_id, product_id, batch_id, quantity_sold, unit_price, line_total)
    VALUES (p_order_id, p_product_id, p_batch_id, p_quantity_sold, p_unit_price, line_total);
    
    UPDATE inventory SET quantity_in_stock = quantity_in_stock - p_quantity_sold, quantity_sold = quantity_sold + p_quantity_sold
    WHERE product_id = p_product_id;
END//
DELIMITER ;

-- Procedure 3: Get Daily Production Report
DELIMITER //
CREATE PROCEDURE get_daily_production_report(IN p_date DATE)
BEGIN
    SELECT 
        p.product_name,
        p.category,
        SUM(pb.quantity_produced) as quantity_produced,
        SUM(pb.quantity_produced * pb.cost_per_unit) as production_cost,
        COUNT(DISTINCT pb.batch_id) as number_of_batches
    FROM production_batches pb
    JOIN products p ON pb.product_id = p.product_id
    WHERE DATE(pb.production_date) = p_date
    GROUP BY p.product_id, p.product_name, p.category;
END//
DELIMITER ;

-- Procedure 4: Get Daily Sales Report
DELIMITER //
CREATE PROCEDURE get_daily_sales_report(IN p_date DATE)
BEGIN
    SELECT 
        so.order_id,
        c.customer_name,
        e.employee_name,
        p.product_name,
        soi.quantity_sold,
        soi.unit_price,
        soi.line_total
    FROM sales_orders so
    JOIN customers c ON so.customer_id = c.customer_id
    JOIN employees e ON so.employee_id = e.employee_id
    JOIN sales_order_items soi ON so.order_id = soi.order_id
    JOIN products p ON soi.product_id = p.product_id
    WHERE DATE(so.order_date) = p_date
    ORDER BY so.order_id;
END//
DELIMITER ;

-- =====================================================
-- SUMMARY
-- =====================================================
-- Tables Created: 9
-- Views Created: 4
-- Stored Procedures: 4
-- 
-- Features:
-- ✓ Complete production tracking
-- ✓ Inventory management
-- ✓ Sales order processing
-- ✓ Employee and customer management
-- ✓ Daily production and sales summaries
-- ✓ Comprehensive reporting views
-- ✓ Stored procedures for common operations
