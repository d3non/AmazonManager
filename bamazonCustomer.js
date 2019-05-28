var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    
    var sql = "select * from products";

    connection.query(sql, function (err, result) {
        if (err) throw err;
        const cTable = require('console.table');
        console.table(result);
      });

    connection.end();
});