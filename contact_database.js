const mysql = require('mysql2');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "$Ethereum117",
    database: "crud_contacto",
});

module.exports = db;