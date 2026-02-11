const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const pool = require('../utils/db')
const result = require('../utils/result')

const router = express.Router()
const SaltRounds = 10
const JWT_SECRET = 'hhvshvfvuqfasjhhasdbjajasjvuu'

// authenticate customer
router.post('/login', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.send(result.createResult('Email and password are required'))

    const sql = 'SELECT * FROM customers WHERE email = ? AND deleted_at IS NULL'
    pool.query(sql, [email], (err, data) => {
        if (err)
            res.send(result.createResult(err))
        else if (data.length == 0)
            res.send(result.createResult('Invalid Email or Password'))
        else {
            const customer = data[0]
            bcrypt.compare(password, customer.password, (err, isMatch) => {
                if (isMatch) {
                    const token = jwt.sign({ customer_id: customer.customer_id, email: customer.email }, JWT_SECRET)
                    // return token plus customer profile (without password)
                    res.send(result.createResult(null, {
                        token,
                        customer_id: customer.customer_id,
                        customer_name: customer.customer_name,
                        email: customer.email,
                        phone_number: customer.phone_number,
                        address: customer.address
                    }))
                }
                else
                    res.send(result.createResult('Invalid Email or Password'))
            })
        }
    })
})

// list all customers -> Admin API
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM customers WHERE deleted_at IS NULL'
    pool.query(sql, (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// create customer
router.post('/', (req, res) => {
    const { customer_name, email, password, phone_number, address, city, state, zip_code } = req.body
    const sql = `INSERT INTO customers (customer_name,password,email,phone_number,address,city,state,zip_code) VALUES(?,?,?,?,?,?,?,?)`
    bcrypt.hash(password, SaltRounds, (err, hashedPassword) => {
        if (hashedPassword) {
            pool.query(sql, [customer_name, hashedPassword, email || null, phone_number || null, address || null, city || null, state || null, zip_code || null], (err, data) => {
                res.send(result.createResult(err, data))
            })
        }
        else
            res.send(result.createResult(err))
    })
})

// update phone_number by uid
router.put('/', (req, res) => {
    const { uid, phone_number } = req.body
    const sql = `UPDATE customers SET phone_number = ? WHERE customer_id = ?`
    pool.query(sql, [phone_number || null, uid], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

// soft delete customer
router.delete('/:id', (req, res) => {
    const uid = req.params.id
    const sql = `UPDATE customers SET deleted_at = NOW() WHERE customer_id = ?`
    pool.query(sql, [uid], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

module.exports = router
