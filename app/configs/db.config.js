const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({${{ Postgres.DATABASE_PUBLIC_URL }}});
module.exports = pool;
