# Manjul Ice Pops - Database Management System

## 📋 Project Overview

Manjul Ice Pops is a comprehensive database management system designed for tracking production, inventory, and sales operations of an ice pop manufacturing and distribution business. This system streamlines operations across manufacturing, inventory control, customer relationships, and financial analytics.

## 🎯 Key Features

- **Product Management** - Track ice pops, lassi, and orange juice products with pricing and cost analysis
- **Production Tracking** - Batch-based manufacturing with quality control and cost monitoring
- **Inventory Management** - Real-time stock tracking and automated inventory updates
- **Sales Order Processing** - Customer orders with payment status and detailed line items
- **Employee Management** - Staff records with roles and salary information
- **Customer Management** - Retail and wholesale customer database with purchase history
- **Business Analytics** - Pre-built views and reports for performance analysis
- **Automated Operations** - Stored procedures for common business processes

## 📁 Project Structure

```
ManjulIcePops/
├── README.md                      # Project overview (this file)
├── DATABASE_DOCUMENTATION.md      # Comprehensive database documentation
├── manjul_db_schema.sql          # Complete database schema and sample data
└── [Additional files as needed]
```

## 🗄️ Database Details

**Database Name:** `manjul_db`

### Core Tables (9 Total)
1. **PRODUCTS** - Product catalog with pricing
2. **EMPLOYEES** - Staff information and roles
3. **PRODUCTION_BATCHES** - Manufacturing batch records
4. **INVENTORY** - Stock level tracking
5. **CUSTOMERS** - Customer database
6. **SALES_ORDERS** - Order records
7. **SALES_ORDER_ITEMS** - Order line items
8. **DAILY_PRODUCTION_SUMMARY** - Daily production metrics
9. **DAILY_SALES_SUMMARY** - Daily sales metrics

### Current Products
- 🍧 **Ice Pops**: Mango, Strawberry, Chocolate
- 🥛 **Lassi**: Mango, Sweet
- 🧡 **Orange Juice**: Fresh squeezed

## 🚀 Getting Started

### Prerequisites
- MySQL 5.7 or higher
- Database client (MySQL Workbench, DBeaver, or command line)

### Installation

1. **Create the database:**
   ```sql
   CREATE DATABASE IF NOT EXISTS manjul_db;
   USE manjul_db;
   ```

2. **Import the schema:**
   ```bash
   mysql -u username -p manjul_db < manjul_db_schema.sql
   ```

3. **Verify installation:**
   ```sql
   SHOW TABLES;
   ```

## 📊 Database Views

The system includes 4 pre-built views for analytics:

| View Name | Purpose |
|-----------|---------|
| `employee_sales_summary` | Track sales performance by employee |
| `product_sales_summary` | Analyze product profitability |
| `customer_purchase_summary` | Monitor customer buying patterns |
| `daily_stock_status` | Real-time inventory status |

## 🔧 Stored Procedures

Automated procedures for common operations:

```sql
-- Add a production batch
CALL add_production_batch(product_id, date, quantity, cost, employee_id, notes);

-- Record a sale
CALL record_sale(order_id, product_id, batch_id, quantity, unit_price);

-- Generate daily reports
CALL get_daily_production_report(date);
CALL get_daily_sales_report(date);
```

## 📈 Quick Analytics

### Check Product Performance
```sql
SELECT * FROM product_sales_summary 
ORDER BY gross_profit DESC;
```

### Employee Sales Ranking
```sql
SELECT * FROM employee_sales_summary 
ORDER BY total_revenue DESC;
```

### Customer Analysis
```sql
SELECT * FROM customer_purchase_summary
ORDER BY total_purchase_value DESC;
```

### Inventory Status
```sql
SELECT * FROM daily_stock_status
ORDER BY available_stock ASC;
```

## 💼 Business Metrics

### Sample Data Included
- ✅ 6 Products with pricing
- ✅ 5 Employees in various roles
- ✅ 5 Customers across multiple cities
- ✅ 5 Sales Orders with 16 line items
- ✅ 10 Production batches
- ✅ Complete inventory records

### Key Performance Indicators
- **Total Inventory Value**: ₹3,540+ (current stock)
- **Total Sales**: ₹10,500 (sample data)
- **Current Stock Levels**: 3,420 units
- **Active Products**: 6
- **Active Employees**: 5

## 📝 Documentation

Comprehensive documentation is available in [DATABASE_DOCUMENTATION.md](DATABASE_DOCUMENTATION.md) including:
- Detailed table schemas
- Relationship diagrams
- Usage examples
- Maintenance guidelines
- Best practices

## 🔍 Data Integrity Features

- **Foreign Key Constraints** - Maintain referential integrity
- **Soft Deletes** - Preserve historical data with `is_active` flags
- **Timestamps** - Track creation and modification times
- **Unique Constraints** - Prevent duplicate products
- **Cascade Deletes** - Automatic cleanup of related records
- **Performance Indexes** - 10 optimized indexes for query performance

## 📋 Maintenance Schedule

| Frequency | Task |
|-----------|------|
| **Weekly** | Review sales/production summaries |
| **Monthly** | Profitability analysis, inventory reconciliation |
| **Quarterly** | Trend analysis, customer segmentation |
| **Annually** | Archive old data, schema optimization |

## 🔐 Best Practices

1. ✅ Always use stored procedures for multi-table operations
2. ✅ Maintain regular backups (daily recommended)
3. ✅ Perform monthly physical inventory audits
4. ✅ Monitor payment status regularly
5. ✅ Track all cost variances
6. ✅ Use soft deletes instead of hard deletes
7. ✅ Keep audit logs of sensitive operations
8. ✅ Test restore procedures monthly

## 📞 Technical Support

For detailed information about:
- **Database Schema**: See `manjul_db_schema.sql`
- **Complete Documentation**: See `DATABASE_DOCUMENTATION.md`
- **Table Structures**: Check DATABASE_DOCUMENTATION.md → Tables section
- **Query Examples**: See DATABASE_DOCUMENTATION.md → Usage Examples

## 📅 Version History

**Version 1.0** - January 28, 2026
- Initial database schema
- 9 core tables
- 4 analytical views
- 4 stored procedures
- Sample data included
- Complete documentation

## 📄 License

This database schema and documentation are created for Manjul Ice Pops business operations.

---

**Last Updated:** January 28, 2026  
**Status:** Active Development  
**Contact:** Harshal Avinash Gaulkar 
Mobile No :- 9356452473
=======
