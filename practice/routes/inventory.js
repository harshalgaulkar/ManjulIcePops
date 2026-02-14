const express = require('express')

const pool = require('../utils/db')
const result = require('../utils/result')

const router = express.Router()

// list all products
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM products'
    pool.query(sql, (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// create product
router.post('/', (req, res) => {
    const { product_name, category, cost_price, selling_price, quantity_unit, description } = req.body
    const sql = `INSERT INTO products (product_name, category, cost_price, selling_price, quantity_unit, description) VALUES(?,?,?,?,?,?)`
    pool.query(sql, [product_name, category || null, cost_price || null, selling_price || null, quantity_unit || null, description || null], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// update product inventory after sale or restock
router.put('/:id', (req, res) => {
    const { quantity_unit } = req.body
    const sql = `UPDATE products SET quantity_unit = ? WHERE product_id = ?`
    pool.query(sql, [quantity_unit, req.params.id], (err, data) => {
        res.send(result.createResult(err, data))
    })
})


// delete product
router.delete('/:id', (req, res) => {
    const sql = `DELETE FROM products WHERE product_id = ?`
    pool.query(sql, [req.params.id], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// get product details by id
router.get('/:id', (req, res) => {
    const sql = `SELECT * FROM products WHERE product_id = ?`
    pool.query(sql, [req.params.id], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// list products by category
router.get('/category/:category', (req, res) => {
    const sql = `SELECT * FROM products WHERE category = ?`
    pool.query(sql, [req.params.category], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// search products by name
router.get('/search/:name', (req, res) => {
    const sql = `SELECT * FROM products WHERE product_name LIKE ?`
    pool.query(sql, [`%${req.params.name}%`], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// list low stock products (quantity_unit < threshold)
router.get('/low-stock/:threshold', (req, res) => {
    const sql = `SELECT * FROM products WHERE quantity_unit < ?`
    pool.query(sql, [req.params.threshold], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// list products sorted by selling price
router.get('/sorted/price', (req, res) => {
    const sql = `SELECT * FROM products ORDER BY selling_price ASC`
    pool.query(sql, (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// list products sorted by name
router.get('/sorted/name', (req, res) => {
    const sql = `SELECT * FROM products ORDER BY product_name ASC`
    pool.query(sql, (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// list products sorted by category
router.get('/sorted/category', (req, res) => {
    const sql = `SELECT * FROM products ORDER BY category ASC`
    pool.query(sql, (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// list products sorted by quantity
router.get('/sorted/quantity', (req, res) => {
    const sql = `SELECT * FROM products ORDER BY quantity_unit ASC`
    pool.query(sql, (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// check my stock value (cost_price * quantity_unit)
router.get('/stock-value', (req, res) => {
    const sql = `SELECT SUM(cost_price * quantity_unit) AS stock_value FROM products`
    pool.query(sql, (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// check my potential revenue (selling_price * quantity_unit)
router.get('/potential-revenue', (req, res) => {
    const sql = `SELECT SUM(selling_price * quantity_unit) AS potential_revenue FROM products`
    pool.query(sql, (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// check my potential profit (potential_revenue - stock_value)
router.get('/potential-profit', (req, res) => {
    const sql = `SELECT (SUM(selling_price * quantity_unit) - SUM(cost_price * quantity_unit)) AS potential_profit FROM products`
    pool.query(sql, (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// check my profit margin ((selling_price - cost_price) / selling_price * 100)
router.get('/profit-margin', (req, res) => {
    const sql = `SELECT product_name, ((selling_price - cost_price) / selling_price * 100) AS profit_margin FROM products`
    pool.query(sql, (err, data) => {
        res.send(result.createResult(err, data))
    })
})

module.exports = router