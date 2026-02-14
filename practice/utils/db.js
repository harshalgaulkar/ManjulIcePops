require('dotenv').config();

const DB_PORT = process.env.DB_PORT || '3306';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_NAME = process.env.DB_NAME || process.env.DB_DATABASE || 'manjul_db';

let pool;
if (DB_PORT === '5432' || process.env.DB_CLIENT === 'postgres' || process.env.DB_DIALECT === 'postgres') {
    const { Pool } = require('pg');
    pool = new Pool({
        host: DB_HOST,
        port: parseInt(DB_PORT, 10),
        user: DB_USER,
        password: DB_PASS,
        database: DB_NAME
    });
} else {
    const mysql2 = require('mysql2');
    pool = mysql2.createPool({
        host: DB_HOST,
        port: parseInt(DB_PORT, 10),
        user: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}

module.exports = pool;