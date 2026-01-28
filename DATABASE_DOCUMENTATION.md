# Manjul Ice Pops Database Documentation

## Table of Contents
1. [Overview](#overview)
2. [Database Architecture](#database-architecture)
3. [Tables](#tables)
4. [Relationships](#relationships)
5. [Views](#views)
6. [Stored Procedures](#stored-procedures)
7. [Sample Data](#sample-data)
8. [Indexes](#indexes)
9. [Usage Examples](#usage-examples)
10. [Maintenance](#maintenance)

---

## Overview

**Database Name:** `manjul_db`

The Manjul Ice Pops database is a comprehensive management system designed to track:
- **Product Inventory** - Ice Pops, Lassi, and Orange Juice products
- **Production Operations** - Batch-based manufacturing with quality tracking
- **Sales Management** - Order processing and customer relationships
- **Employee Management** - Staff information and roles
- **Financial Tracking** - Cost analysis, pricing, and profit margins

**Purpose:** To streamline operations for an ice pop manufacturing and distribution business, enabling efficient inventory control, production planning, and sales analytics.

---

## Database Architecture

### Entity Relationship Overview

```
PRODUCTS
   ├── INVENTORY (1:1)
   ├── PRODUCTION_BATCHES (1:N)
   └── SALES_ORDER_ITEMS (1:N)

EMPLOYEES
   ├── PRODUCTION_BATCHES (1:N)
   └── SALES_ORDERS (1:N)

CUSTOMERS
   └── SALES_ORDERS (1:N)

SALES_ORDERS
   └── SALES_ORDER_ITEMS (N:1)

DAILY_PRODUCTION_SUMMARY (Summary table)
DAILY_SALES_SUMMARY (Summary table)
```

---

## Tables

### 1. PRODUCTS Table
**Purpose:** Store information about all products available for production and sale.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `product_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique product identifier |
| `product_name` | VARCHAR(100) | NOT NULL, UNIQUE | Product name (e.g., "Mango Ice Pop") |
| `category` | ENUM | NOT NULL | Category: 'Ice Pop', 'Lassi', 'Orange Juice' |
| `cost_price` | DECIMAL(10,2) | NOT NULL | Cost to manufacture per unit |
| `selling_price` | DECIMAL(10,2) | NOT NULL | Retail selling price per unit |
| `quantity_unit` | VARCHAR(50) | DEFAULT 'Piece' | Unit of measurement (Piece, Liter, Bottle) |
| `description` | TEXT | NULLABLE | Product details and specifications |
| `is_active` | BOOLEAN | DEFAULT TRUE | Soft delete flag |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| `updated_at` | TIMESTAMP | AUTO UPDATE | Last modification timestamp |

**Sample Products:**
- Mango Ice Pop (Cost: ₹5.00, Selling: ₹10.00)
- Strawberry Ice Pop (Cost: ₹4.50, Selling: ₹9.00)
- Chocolate Ice Pop (Cost: ₹5.50, Selling: ₹11.00)
- Mango Lassi (Cost: ₹15.00, Selling: ₹30.00/Liter)
- Sweet Lassi (Cost: ₹12.00, Selling: ₹25.00/Liter)
- Orange Juice (Cost: ₹20.00, Selling: ₹40.00/Liter)

---

### 2. EMPLOYEES Table
**Purpose:** Maintain employee records including contact, position, and salary information.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `employee_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique employee identifier |
| `employee_name` | VARCHAR(100) | NOT NULL | Full name |
| `email` | VARCHAR(100) | NULLABLE | Email address |
| `phone_number` | VARCHAR(15) | NULLABLE | Contact number |
| `position` | VARCHAR(50) | NULLABLE | Job title (Sales Executive, Production Manager, etc.) |
| `salary` | DECIMAL(12,2) | NULLABLE | Monthly salary |
| `hire_date` | DATE | NULLABLE | Employment start date |
| `is_active` | BOOLEAN | DEFAULT TRUE | Soft delete/active status flag |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| `updated_at` | TIMESTAMP | AUTO UPDATE | Last modification timestamp |

**Positions:** Sales Executive, Production Manager, Inventory Manager

**Current Employees:**
- Raj Kumar - Sales Executive
- Priya Singh - Sales Executive
- Amit Patel - Production Manager
- Neha Sharma - Sales Executive
- Rohan Gupta - Inventory Manager

---

### 3. PRODUCTION_BATCHES Table
**Purpose:** Track production runs, linking products to specific manufacturing batches.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `batch_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique batch identifier |
| `product_id` | INT | NOT NULL, FK | Reference to PRODUCTS table |
| `production_date` | DATE | NOT NULL | Date of production |
| `quantity_produced` | INT | NOT NULL | Number of units produced |
| `cost_per_unit` | DECIMAL(10,2) | NULLABLE | Actual cost per unit for this batch |
| `batch_notes` | TEXT | NULLABLE | Quality notes, issues, or comments |
| `produced_by` | INT | NULLABLE, FK | Employee who supervised production |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |

**Key Features:**
- Links products to batches for quality tracking
- Maintains actual production costs (may differ from standard cost)
- Supports traceability for quality control

---

### 4. INVENTORY Table
**Purpose:** Real-time tracking of product stock levels and sales quantities.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `inventory_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique inventory record ID |
| `product_id` | INT | NOT NULL, UNIQUE, FK | Reference to PRODUCTS table |
| `quantity_in_stock` | INT | DEFAULT 0 | Current available stock |
| `quantity_sold` | INT | DEFAULT 0 | Cumulative units sold (for analytics) |
| `last_updated` | TIMESTAMP | AUTO UPDATE | Last modification timestamp |

**Note:** One-to-one relationship with PRODUCTS table. Updated by production and sales operations.

---

### 5. CUSTOMERS Table
**Purpose:** Maintain customer information and contact details for bulk/wholesale clients.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `customer_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique customer identifier |
| `customer_name` | VARCHAR(100) | NOT NULL | Business/customer name |
| `email` | VARCHAR(100) | NULLABLE | Email address |
| `phone_number` | VARCHAR(15) | NULLABLE | Contact number |
| `address` | VARCHAR(255) | NULLABLE | Street address |
| `city` | VARCHAR(50) | NULLABLE | City name |
| `state` | VARCHAR(50) | NULLABLE | State/Province |
| `zip_code` | VARCHAR(10) | NULLABLE | Postal code |
| `is_active` | BOOLEAN | DEFAULT TRUE | Active/inactive status |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| `updated_at` | TIMESTAMP | AUTO UPDATE | Last modification timestamp |

**Sample Customers:**
- ABC Retail Store (Delhi)
- XYZ Super Market (Mumbai)
- Quick Mart Chain (Bangalore)
- Local Kirana Shop (Delhi)
- City Mall Food Court (Pune)

---

### 6. SALES_ORDERS Table
**Purpose:** Record customer orders with payment status and totals.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `order_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique order identifier |
| `customer_id` | INT | NOT NULL, FK | Reference to CUSTOMERS table |
| `employee_id` | INT | NOT NULL, FK | Sales executive who handled the order |
| `order_date` | DATE | NOT NULL | Order date |
| `total_amount` | DECIMAL(12,2) | NOT NULL | Total order value |
| `payment_status` | ENUM | DEFAULT 'Pending' | Status: 'Pending', 'Paid', 'Partial' |
| `notes` | TEXT | NULLABLE | Special instructions or comments |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| `updated_at` | TIMESTAMP | AUTO UPDATE | Last modification timestamp |

**Payment Status Values:**
- `Pending` - Payment not received
- `Paid` - Full payment received
- `Partial` - Partial payment received

---

### 7. SALES_ORDER_ITEMS Table
**Purpose:** Line items for each sales order, detailing products and quantities.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `order_item_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique line item identifier |
| `order_id` | INT | NOT NULL, FK | Reference to SALES_ORDERS table |
| `product_id` | INT | NOT NULL, FK | Reference to PRODUCTS table |
| `batch_id` | INT | NULLABLE, FK | Reference to specific production batch |
| `quantity_sold` | INT | NOT NULL | Quantity of this product in order |
| `unit_price` | DECIMAL(10,2) | NOT NULL | Price per unit at time of sale |
| `line_total` | DECIMAL(12,2) | NOT NULL | Calculated as quantity_sold × unit_price |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |

**Key Features:**
- Supports batch-specific sales (useful for quality tracing)
- Stores historical pricing
- Cascade delete on order deletion

---

### 8. DAILY_PRODUCTION_SUMMARY Table
**Purpose:** Daily aggregate of all production activities for reporting.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `summary_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique summary record ID |
| `production_date` | DATE | NOT NULL, UNIQUE | Summary date |
| `total_quantity_produced` | INT | DEFAULT 0 | Total units produced on date |
| `total_production_cost` | DECIMAL(12,2) | DEFAULT 0 | Total cost of all production |
| `notes` | TEXT | NULLABLE | Daily notes or observations |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |

**Purpose:** Efficiency and trend analysis over time.

---

### 9. DAILY_SALES_SUMMARY Table
**Purpose:** Daily aggregate of all sales activities for reporting.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `summary_id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique summary record ID |
| `sales_date` | DATE | NOT NULL, UNIQUE | Summary date |
| `total_orders` | INT | DEFAULT 0 | Number of orders on date |
| `total_quantity_sold` | INT | DEFAULT 0 | Total units sold |
| `total_sales_amount` | DECIMAL(12,2) | DEFAULT 0 | Total revenue for the day |
| `notes` | TEXT | NULLABLE | Daily notes or observations |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |

**Purpose:** Daily sales metrics and performance tracking.

---

## Relationships

### Foreign Key Relationships

1. **PRODUCTS ← PRODUCTION_BATCHES**
   - Relationship: One-to-Many
   - Constraint: ON DELETE RESTRICT

2. **PRODUCTS ← INVENTORY**
   - Relationship: One-to-One
   - Constraint: UNIQUE product_id

3. **PRODUCTS ← SALES_ORDER_ITEMS**
   - Relationship: One-to-Many
   - Constraint: ON DELETE RESTRICT

4. **EMPLOYEES ← PRODUCTION_BATCHES**
   - Relationship: One-to-Many
   - Field: `produced_by`

5. **EMPLOYEES ← SALES_ORDERS**
   - Relationship: One-to-Many
   - Field: `employee_id`

6. **CUSTOMERS ← SALES_ORDERS**
   - Relationship: One-to-Many

7. **SALES_ORDERS ← SALES_ORDER_ITEMS**
   - Relationship: One-to-Many
   - Constraint: ON DELETE CASCADE

8. **PRODUCTION_BATCHES ← SALES_ORDER_ITEMS**
   - Relationship: Many-to-One
   - Purpose: Batch traceability

---

## Views

### 1. employee_sales_summary
**Purpose:** Analyze sales performance by employee.

**Columns:**
- `employee_id` - Employee identifier
- `employee_name` - Employee name
- `total_orders` - Number of orders handled
- `total_quantity_sold` - Total units sold
- `total_revenue` - Total revenue generated

**Query Logic:**
```sql
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
```

**Use Case:** Performance evaluations, commission calculations

---

### 2. product_sales_summary
**Purpose:** Comprehensive product performance metrics.

**Columns:**
- `product_id`, `product_name`, `category`
- `selling_price` - Current selling price
- `quantity_in_stock` - Available inventory
- `total_sold` - Cumulative units sold
- `total_produced` - Total manufactured
- `production_cost` - Total production cost
- `total_revenue` - Total sales revenue
- `gross_profit` - Revenue minus production cost

**Use Case:** Product profitability analysis, inventory planning, discontinuation decisions

---

### 3. customer_purchase_summary
**Purpose:** Track customer buying behavior and value.

**Columns:**
- `customer_id`, `customer_name`, `city`
- `total_orders` - Number of orders placed
- `total_quantity_purchased` - Total units bought
- `total_purchase_value` - Total money spent

**Use Case:** Customer segmentation, loyalty programs, sales targeting

---

### 4. daily_stock_status
**Purpose:** Real-time inventory status by product.

**Columns:**
- `product_id`, `product_name`, `category`
- `available_stock` - Current stock level
- `total_sold` - Cumulative sales
- `total_produced` - Cumulative production

**Use Case:** Inventory management, reorder planning, stock audits

---

## Stored Procedures

### 1. add_production_batch()
**Purpose:** Record a new production batch and automatically update inventory.

**Parameters:**
- `p_product_id` (INT) - Product being manufactured
- `p_production_date` (DATE) - Date of production
- `p_quantity_produced` (INT) - Units manufactured
- `p_cost_per_unit` (DECIMAL) - Actual cost per unit
- `p_produced_by` (INT) - Employee ID of supervisor
- `p_batch_notes` (TEXT) - Quality or process notes

**Operations:**
1. Inserts record into PRODUCTION_BATCHES
2. Updates INVENTORY table, increasing quantity_in_stock

**Example:**
```sql
CALL add_production_batch(1, '2025-12-15', 500, 5.00, 3, 'Morning batch - Good quality');
```

---

### 2. record_sale()
**Purpose:** Record a sale item and update inventory automatically.

**Parameters:**
- `p_order_id` (INT) - Associated sales order
- `p_product_id` (INT) - Product being sold
- `p_batch_id` (INT) - Production batch (for traceability)
- `p_quantity_sold` (INT) - Units sold
- `p_unit_price` (DECIMAL) - Sale price per unit

**Operations:**
1. Calculates line_total (quantity × price)
2. Inserts into SALES_ORDER_ITEMS
3. Updates INVENTORY (decreases stock, increases quantity_sold)

**Example:**
```sql
CALL record_sale(5, 1, 7, 100, 10.00);
```

---

### 3. get_daily_production_report()
**Purpose:** Generate detailed production report for a specific date.

**Parameters:**
- `p_date` (DATE) - Date to report on

**Returns:**
- Product name and category
- Total quantity produced
- Production cost
- Number of batches

**Example:**
```sql
CALL get_daily_production_report('2025-12-10');
```

---

### 4. get_daily_sales_report()
**Purpose:** Generate detailed sales report for a specific date.

**Parameters:**
- `p_date` (DATE) - Date to report on

**Returns:**
- Order ID, Customer name, Employee name
- Product details
- Quantity, unit price, line total

**Example:**
```sql
CALL get_daily_sales_report('2025-12-10');
```

---

## Sample Data

### Current Inventory Status
| Product | Category | Stock | Sold | Price |
|---------|----------|-------|------|-------|
| Mango Ice Pop | Ice Pop | 1050 | 50 | ₹10.00 |
| Strawberry Ice Pop | Ice Pop | 800 | 50 | ₹9.00 |
| Chocolate Ice Pop | Ice Pop | 300 | 0 | ₹11.00 |
| Mango Lassi | Lassi | 190 | 0 | ₹30.00/L |
| Sweet Lassi | Lassi | 80 | 0 | ₹25.00/L |
| Orange Juice | Orange Juice | 220 | 0 | ₹40.00/L |

### Recent Orders
- 5 orders recorded (Dec 10-11, 2025)
- Total sales: ₹10,500
- 3 paid, 1 partial, 1 pending

---

## Indexes

**Performance Indexes Created:**

| Index | Table | Column | Purpose |
|-------|-------|--------|---------|
| `idx_product_category` | PRODUCTS | category | Filter by product type |
| `idx_employee_position` | EMPLOYEES | position | Role-based queries |
| `idx_batch_product` | PRODUCTION_BATCHES | product_id | Find batches by product |
| `idx_batch_date` | PRODUCTION_BATCHES | production_date | Daily production queries |
| `idx_order_customer` | SALES_ORDERS | customer_id | Customer order history |
| `idx_order_employee` | SALES_ORDERS | employee_id | Employee sales tracking |
| `idx_order_date` | SALES_ORDERS | order_date | Date range queries |
| `idx_order_item_product` | SALES_ORDER_ITEMS | product_id | Product sales details |
| `idx_production_summary_date` | DAILY_PRODUCTION_SUMMARY | production_date | Daily reports |
| `idx_sales_summary_date` | DAILY_SALES_SUMMARY | sales_date | Daily reports |

---

## Usage Examples

### Example 1: Add a Production Batch
```sql
CALL add_production_batch(2, '2025-12-15', 400, 4.50, 3, 'Strawberry batch - excellent quality');

-- Verify: Check updated inventory
SELECT product_name, quantity_in_stock 
FROM products p
JOIN inventory i ON p.product_id = i.product_id
WHERE p.product_id = 2;
```

### Example 2: Record a Sales Order
```sql
-- Step 1: Create the sales order
INSERT INTO sales_orders (customer_id, employee_id, order_date, total_amount, payment_status)
VALUES (1, 1, '2025-12-15', 3000.00, 'Pending');

-- Step 2: Add line items using stored procedure
CALL record_sale(6, 1, 7, 150, 10.00);  -- 150 units of Mango Ice Pop @ ₹10
CALL record_sale(6, 2, 8, 100, 9.00);   -- 100 units of Strawberry @ ₹9
```

### Example 3: Get Employee Sales Performance
```sql
SELECT * FROM employee_sales_summary 
ORDER BY total_revenue DESC;
```

### Example 4: Analyze Product Profitability
```sql
SELECT 
    product_name,
    category,
    gross_profit,
    (gross_profit / total_revenue * 100) as profit_margin_percent
FROM product_sales_summary
WHERE total_revenue > 0
ORDER BY profit_margin_percent DESC;
```

### Example 5: Check Daily Stock Status
```sql
SELECT * FROM daily_stock_status 
WHERE category = 'Ice Pop'
ORDER BY available_stock ASC;
```

### Example 6: Customer Purchase History
```sql
SELECT * FROM customer_purchase_summary
ORDER BY total_purchase_value DESC;
```

---

## Maintenance

### Regular Maintenance Tasks

#### Weekly
- Review daily sales and production summaries
- Check payment status of pending orders
- Verify inventory levels against physical stock

#### Monthly
- Run product profitability analysis
- Review employee performance metrics
- Reconcile inventory discrepancies
- Update product prices if needed

#### Quarterly
- Analyze seasonal trends
- Evaluate customer concentration risk
- Review production cost variances
- Archive old data if needed

### Data Integrity Checks

```sql
-- Check for orphaned records
SELECT * FROM sales_order_items WHERE order_id NOT IN (SELECT order_id FROM sales_orders);

-- Verify inventory consistency
SELECT p.product_id, p.product_name
FROM products p
LEFT JOIN inventory i ON p.product_id = i.product_id
WHERE i.product_id IS NULL;

-- Find inactive products with stock
SELECT product_name, quantity_in_stock
FROM products p
JOIN inventory i ON p.product_id = i.product_id
WHERE p.is_active = FALSE AND i.quantity_in_stock > 0;
```

### Backup Strategy

- **Frequency:** Daily automated backups
- **Retention:** 30-day rolling backup window
- **Testing:** Monthly restore tests
- **Location:** Separate secure storage

### Query Performance Optimization

For large datasets, consider:
1. Regular index analysis and optimization
2. Partitioning by date for SALES_ORDERS and PRODUCTION_BATCHES
3. Archive historical data older than 1 year
4. Use appropriate EXPLAIN ANALYZE for slow queries

---

## Best Practices

1. **Always use soft deletes** - Set `is_active = FALSE` instead of deleting records
2. **Maintain data consistency** - Use stored procedures for multi-table operations
3. **Timestamp all records** - Track creation and modification times
4. **Validate inventory** - Monthly physical counts against database
5. **Monitor payment status** - Follow up on pending/partial payments
6. **Archive old data** - Move data older than 2 years to archive tables
7. **Audit trail** - Consider adding audit tables for sensitive operations
8. **Regular backups** - Test restore procedures monthly

---

## Contact & Support

For questions about this database schema or implementation, please refer to the SQL schema file: `manjul_db_schema.sql`

**Last Updated:** January 28, 2026
**Database Version:** 1.0
**Created for:** Manjul Ice Pops Business Management System
