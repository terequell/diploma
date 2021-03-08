const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
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