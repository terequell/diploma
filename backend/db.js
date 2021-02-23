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
});

// connection.query('SELECT * FROM table1', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results);
// });

module.exports = connection;