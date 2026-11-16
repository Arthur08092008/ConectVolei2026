const { Pool, types } = require('pg');

types.setTypeParser(1082, (v) => v);            // DATE  -> 'YYYY-MM-DD'
types.setTypeParser(1083, (v) => v.slice(0, 5)); // TIME  -> 'HH:MM'

module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});
