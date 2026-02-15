const express = require('express')

const pool = require('../utils/db')
const result = require('../utils/result')

const router = express.Router()

// list all production batches
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM production_batches'
    pool.query(sql, (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// create production batch
router.post('/', (req, res) => {
    const { product_id, batch_number, quantity_produced, production_date, expiration_date } = req.body
    const sql = `INSERT INTO production_batches (product_id, batch_number, quantity_produced, production_date, expiration_date) VALUES(?,?,?,?,?)`
    pool.query(sql, [product_id || null, batch_number || null, quantity_produced || null, production_date || null, expiration_date || null], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// update production batch
router.put('/:batch_id', (req, res) => {
    const { batch_id } = req.params
    const { product_id, batch_number, quantity_produced, production_date, expiration_date } = req.body
    const sql = `UPDATE production_batches SET product_id=?, batch_number=?, quantity_produced=?, production_date=?, expiration_date=? WHERE batch_id=?`
    pool.query(sql, [product_id || null, batch_number || null, quantity_produced || null, production_date || null, expiration_date || null, batch_id], (err, data) => {
        res.send(result.createResult(err, data))
    })
})




module.exports = router