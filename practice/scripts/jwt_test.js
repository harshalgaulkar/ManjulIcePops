require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
if (!secret) {
  console.error('ERROR: JWT_SECRET is not set in environment.');
  process.exit(2);
}

const payload = { test: 'jwt-check', ts: Date.now() };

try {
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  console.log('Signed token:');
  console.log(token);

  const decoded = jwt.verify(token, secret);
  console.log('\nVerified payload:');
  console.log(decoded);
  process.exit(0);
} catch (err) {
  console.error('Sign/verify failed:', err && err.message ? err.message : err);
  process.exit(1);
}
