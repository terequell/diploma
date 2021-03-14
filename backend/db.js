const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'diploma-db.com',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'diploma'
});

connection.connect(function (err) {
    if (err) {
        throw new Error(err);
    }

    console.log('Connected to database...');
});

module.exports = connection;