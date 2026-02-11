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


module.exports = router