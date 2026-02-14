const path = require('path');

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'change_this_secret',
  jwtExpiry: process.env.JWT_EXPIRY || '1h',
  env: process.env.NODE_ENV || 'development',
  rootDir: path.resolve(__dirname, '..')
};
