require('dotenv').config();
const pool = require('../utils/db');

function handleError(err) {
  console.error('DB error:', err && err.message ? err.message : err);
  process.exit(2);
}

// Use MySQL-specific queries if pool has query method (mysql2)
if (typeof pool.query === 'function') {
  pool.query("SHOW TABLES LIKE 'inventory'", (err, rows) => {
    if (err) return handleError(err);
    if (!rows || rows.length === 0) {
      console.log('Table `inventory` not found in database.');
      process.exit(0);
    }
    // table exists; describe columns
    pool.query('DESCRIBE inventory', (err2, cols) => {
      if (err2) return handleError(err2);
      console.log('Columns in `inventory`:');
      cols.forEach(c => console.log(`- ${c.Field} : ${c.Type} (${c.Null === 'NO' ? 'NOT NULL' : 'NULLABLE'}) ${c.Key ? ' KEY='+c.Key : ''}`));
      process.exit(0);
    });
  });
} else if (typeof pool.query === 'undefined' && pool instanceof Object) {
  console.error('DB pool does not expose .query — cannot inspect schema from this script.');
  process.exit(2);
} else {
  console.error('Unknown DB pool type; aborting.');
  process.exit(2);
}
