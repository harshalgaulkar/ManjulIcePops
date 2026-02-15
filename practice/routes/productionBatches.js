const express = require('express')

const pool = require('../utils/db')
const result = require('../utils/result')

const router = express.Router()

// list all production batches
router.get('/', (req, res) => {
    const sql = 'SELECT pb.*, p.product_name, e.employee_name FROM production_batches pb LEFT JOIN products p ON pb.product_id = p.product_id LEFT JOIN employees e ON pb.produced_by = e.employee_id ORDER BY pb.production_date DESC'
    pool.query(sql, (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// get batch by ID
router.get('/:batch_id', (req, res) => {
    const { batch_id } = req.params
    const sql = `SELECT pb.*, p.product_name, e.employee_name FROM production_batches pb LEFT JOIN products p ON pb.product_id = p.product_id LEFT JOIN employees e ON pb.produced_by = e.employee_id WHERE pb.batch_id = ?`
    pool.query(sql, [batch_id], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// create production batch
router.post('/', (req, res) => {
    const { product_id, batch_number, quantity_produced, production_date, expiration_date, cost_per_unit, batch_notes, produced_by } = req.body
    const sql = `INSERT INTO production_batches (product_id, batch_number, quantity_produced, production_date, expiration_date, cost_per_unit, batch_notes, produced_by) VALUES(?,?,?,?,?,?,?,?)`
    pool.query(sql, [product_id || null, batch_number || null, quantity_produced || null, production_date || null, expiration_date || null, cost_per_unit || null, batch_notes || null, produced_by || null], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// update production batch
router.put('/:batch_id', (req, res) => {
    const { batch_id } = req.params
    const { product_id, batch_number, quantity_produced, production_date, expiration_date, cost_per_unit, batch_notes, produced_by, quality_check, batch_status } = req.body
    const sql = `UPDATE production_batches SET product_id=?, batch_number=?, quantity_produced=?, production_date=?, expiration_date=?, cost_per_unit=?, batch_notes=?, produced_by=?, quality_check=?, batch_status=? WHERE batch_id=?`
    pool.query(sql, [product_id || null, batch_number || null, quantity_produced || null, production_date || null, expiration_date || null, cost_per_unit || null, batch_notes || null, produced_by || null, quality_check !== undefined ? quality_check : false, batch_status || 'Active', batch_id], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// delete production batch
router.delete('/:batch_id', (req, res) => {
    const { batch_id } = req.params
    const sql = `DELETE FROM production_batches WHERE batch_id = ?`
    pool.query(sql, [batch_id], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// list batches by quantity produced
router.get('/quantity/:quantity', (req, res) => {
    const { quantity } = req.params
    const sql = `SELECT pb.*, p.product_name FROM production_batches pb LEFT JOIN products p ON pb.product_id = p.product_id WHERE pb.quantity_produced >= ? ORDER BY pb.production_date DESC`
    pool.query(sql, [quantity], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// list batches by expiration date
router.get('/expiration/:date', (req, res) => {
    const { date } = req.params
    const sql = `SELECT pb.*, p.product_name FROM production_batches pb LEFT JOIN products p ON pb.product_id = p.product_id WHERE pb.expiration_date <= ? ORDER BY pb.expiration_date ASC`
    pool.query(sql, [date], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// list expired batches (expiration date passed)
router.get('/status/expired', (req, res) => {
    const sql = `SELECT pb.*, p.product_name FROM production_batches pb LEFT JOIN products p ON pb.product_id = p.product_id WHERE pb.expiration_date < CURDATE() AND pb.batch_status = 'Active' ORDER BY pb.expiration_date ASC`
    pool.query(sql, (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// list active batches
router.get('/status/active', (req, res) => {
    const sql = `SELECT pb.*, p.product_name, e.employee_name FROM production_batches pb LEFT JOIN products p ON pb.product_id = p.product_id LEFT JOIN employees e ON pb.produced_by = e.employee_id WHERE pb.batch_status = 'Active' ORDER BY pb.production_date DESC`
    pool.query(sql, (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// update batch status
router.patch('/:batch_id/status', (req, res) => {
    const { batch_id } = req.params
    const { batch_status } = req.body
    const sql = `UPDATE production_batches SET batch_status = ? WHERE batch_id = ?`
    pool.query(sql, [batch_status || 'Active', batch_id], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// update quality check
router.patch('/:batch_id/quality', (req, res) => {
    const { batch_id } = req.params
    const { quality_check } = req.body
    const sql = `UPDATE production_batches SET quality_check = ? WHERE batch_id = ?`
    pool.query(sql, [quality_check !== undefined ? quality_check : true, batch_id], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

module.exports = router