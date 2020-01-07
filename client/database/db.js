const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    socketPath: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    debug: false

})


mysqlConnection.connect((error) => {
    if (!error) {
        console.log('Database Connected');
    } else {
        console.log('Database Failed');
    }
})


module.exports = mysqlConnection;