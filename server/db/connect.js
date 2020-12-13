const {  Pool, Client } = require('pg');

const client = new Client();

const pool = new Pool({
    user: 'kalyanbhowmick',
    // password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'bank_account',
});
  

module.exports = { pool };


