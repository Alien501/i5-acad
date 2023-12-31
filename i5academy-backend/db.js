const mysql = require('mysql2/promise')

const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'I5ACAD'
})

module.exports = conn