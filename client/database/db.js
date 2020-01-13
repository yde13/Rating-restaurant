const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    //mysql://b952a894449950:b94c040f@eu-cdbr-west-02.cleardb.net/heroku_563c14837ca0e79?reconnect=true
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    debug: false

})


mysqlConnection.connect((error) => {
    if (!error) {
        console.log('Database Connected');
    } else {
        console.log(error);

        console.log('Database Failed');
    }
})


module.exports = mysqlConnection;