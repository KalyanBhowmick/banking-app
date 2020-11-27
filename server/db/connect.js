const {  Pool, Client } = require('pg');

const client = new Client();

const pool = new Pool({
    user: process.env.user,
    // password: 'root',
    host: 'localhost',
    port: 5432,
    database: process.env.databasename,
});


module.exports = { pool };


