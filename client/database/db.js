const mysql = require('mysql');

// var mysqlConnection = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME
// })



var mysqlConnection = mysql.createConnection({ 
    socketPath: '/Users/philiplagergrenydehed/Library/Application Support/Local/run/r_YkjEZSk/mysqld.sock', 
    user: 'root', 
    password: 'root', 
    database: 'restaurants', 
    debug: false,
 });

mysqlConnection.connect((error) => {
    if (!error) {
        console.log('Database Connected');
    } else {
        console.log('Database Failed');
    }
})

module.exports = mysqlConnection;