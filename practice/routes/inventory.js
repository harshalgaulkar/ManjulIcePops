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

// count of Products in inventory per category and product which product is out of stock
router.get('/count', (req, res) => {
    const sql = `SELECT category, COUNT(*) AS total_products,
                    SUM(CASE WHEN quantity_unit = 0 THEN 1 ELSE 0 END)
                    AS out_of_stock FROM products GROUP BY category`
    pool.query(sql, (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// check if product is in stock
router.post('/check', (req, res) => {
    const { product_name } = req.body
    const sql = 'SELECT quantity_unit FROM products WHERE product_name = ?'
    pool.query(sql, [product_name], (err, data) => {
        if (err) {
            res.send(result.createResult(err))
        } else if (data.length === 0) {
            res.send(result.createResult(null, { in_stock: false, message: 'Product not found' }))
        } else {
            const in_stock = data[0].quantity_unit > 0
            res.send(result.createResult(null, { in_stock, quantity_unit: data[0].quantity_unit }))
        }
    })
})


module.exports = router