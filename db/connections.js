// connection to sql db 
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employee_tracker',
    multipleStatements: true
}).promise();


module.exports = db;