const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
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