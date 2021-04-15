
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'diploma-db.com',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'diploma',
    waitForConnections: true,
});

export default pool;
