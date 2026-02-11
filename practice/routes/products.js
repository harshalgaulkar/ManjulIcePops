const express = require('express')

const pool = require('../utils/db')
const result = require('../utils/result')

const router = express.Router()

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM products'
    pool.query(sql, (err, results) => {
        if (err) {
            console.error(err)
            return res.json({ error: 'Database query failed' })
        }
        res.json(results)
    })
})

router.post('/',(req, res) =>{
    const sql = 'INSERT INTO products (product_name, category, cost_price, selling_price, quantity_unit, description) VALUES (?,?,?,?,?,?)'
    const values = [
        req.body.product_name,
        req.body.category,
        req.body.cost_price,
        req.body.selling_price,
        req.body.quantity_unit,
        req.body.description
    ]
    pool.query(sql, values, (err, results) => {
        if (err) {
            console.error(err)
            return res.json({ error: 'Database insert failed' })
        }
        res.json({ message: 'Product added successfully', id: results.insertId })
    })
})


router.put('/:id',(req,res) => {
    console.log('Updating product with ID:', req.params.id)
    console.log('Request body:', req.body)
    const sql = 'UPDATE products SET product_name=?, category=?, cost_price=?, selling_price=?, quantity_unit=?, description=? WHERE product_id=?'
    const values = [
        req.body.product_name,
        req.body.category,
        req.body.cost_price,
        req.body.selling_price,
        req.body.quantity_unit,
        req.body.description,
        req.params.id
    ]
    pool.query(sql, values, (err, results) => {
        if (err) {
            console.error(err)
            return res.json({ error: 'Database update failed' })
        }
        res.json({ message: 'Product updated successfully' })
    })
})

router.delete('/:id',(req,res)=> {
    const sql = 'DELETE FROM products WHERE product_id=?'
    pool.query(sql, [req.params.id], (err, results) => {
        if (err) {
            console.error(err)
            return res.json({ error: 'Database delete failed' })
        }
        res.json({ message: 'Product deleted successfully' })
    })
})

router.get('/count',(req,res)=> {
    const sql = 'SELECT COUNT(*) AS count FROM products'
    pool.query(sql, (err, results) => {
        if (err) {
            console.error(err)
            return res.json({ error: 'Database query failed' })
        }
        res.json(results[0])
    })
})

router.get('/search', (req,res) =>{
    const sql ='SELECT * FROM products WHERE product_name LIKE ?'
    pool.query(sql, [`%${req.query.q}%`], (err, results) => {
        if (err) {
            console.error(err)
            return res.json({ error: 'Database query failed' })
        }
        res.json(results)
    })
})


router.get('/lowstock', (req,res) => {
    const sql = 'SELECT * FROM products WHERE quantity_unit < 10'
    pool.query(sql, (err, results) => {
        if (err) {
            console.error(err)
            return res.json({ error: 'Database query failed' })
        }
        res.json(results)
    })
})

router.get('/mostsold', (req,res) => {
    const sql = `
        SELECT p.*, SUM(soi.quantity_sold) as total_quantity_sold
        FROM products p
        LEFT JOIN sales_order_items soi ON p.product_id = soi.product_id
        GROUP BY p.product_id
        ORDER BY total_quantity_sold DESC
        LIMIT 5
    `
    pool.query(sql, (err, results) => {
        if (err) {
            console.error(err)
            return res.json({ error: 'Database query failed' })
        }
        res.json(results)
    })
})

module.exports = router