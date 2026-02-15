const express = require('express')

const pool = require('../utils/db')
const result = require('../utils/result')

const router = express.Router()

// list all employees
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM employees'
    pool.query(sql, (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// create employee
router.post('/', (req, res) => {
    const { employee_name, email, phone_number, position, salary, hire_date } = req.body
    const sql = `INSERT INTO employees (employee_name, email, phone_number, position, salary, hire_date, is_active) VALUES(?,?,?,?,?,?,?)`
    pool.query(sql, [employee_name, email || null, phone_number || null, position || null, salary || null, hire_date || null, true], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// update employee
router.put('/:employee_id', (req, res) => {
    const { employee_id } = req.params
    const { employee_name, email, phone_number, position, salary, hire_date, is_active } = req.body
    const sql = `UPDATE employees SET employee_name=?, email=?, phone_number=?, position=?, salary=?, hire_date=?, is_active=? WHERE employee_id=?`
    pool.query(sql, [employee_name || null, email || null, phone_number || null, position || null, salary || null, hire_date || null, is_active !== undefined ? is_active : true, employee_id], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// delete employee
router.delete('/:employee_id', (req, res) => {
    const { employee_id } = req.params
    const sql = `DELETE FROM employees WHERE employee_id=?`
    pool.query(sql, [employee_id], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// get employee details by id
router.get('/:employee_id', (req, res) => {
    const { employee_id } = req.params
    const sql = `SELECT * FROM employees WHERE employee_id=?`
    pool.query(sql, [employee_id], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// search employees by name
router.get('/search/:name', (req, res) => {
    const { name } = req.params
    const sql = `SELECT * FROM employees WHERE employee_name LIKE ?`
    pool.query(sql, [`%${name}%`], (err, data) => {
        res.send(result.createResult(err, data))
    })
})



module.exports = router