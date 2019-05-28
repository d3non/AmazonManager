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
    
    var sql = "select item_id as ID, product_name as PRODUCT, price AS PRICE from products";

    connection.query(sql, function (err, result) {
        if (err) throw err;
        const cTable = require('console.table');
        console.table(result);
        promptProductQty();

      });

    //connection.end();
});

function promptProductQty(){
    const inquirer = require('inquirer');

    inquirer
      .prompt([
        {
          name: 'item_id',
          message: 'Please type ID number of the proudct you would like to buy',
        },
        {
          name: 'qty',
          message: 'Please type quantity for the selected product',
        },
      ])
      .then(answers => {
        var sql = "select * from products where item_id=" + answers.item_id;

        //console.log(sql)
        connection.query(sql, function (err, result) {
            var stock = parseInt(result[0].stock_quantity);
            var price = result[0].price;
            if (err) throw err;

            if (answers.qty > stock){
               console.log("Insufficient quantity!");
               connection.end();
           }else{
               placeOrder(stock, answers.qty, price, answers.item_id);
         }


         });


    

    })

function placeOrder(stock, qty, price, item_id){
    var total = qty * price;
    var qty = parseInt(stock) - parseInt(qty);
        
    var sql = "update products set stock_quantity = " + qty + " where item_id=" + item_id;
    
    connection.query(sql, function (err, result) {
        if (err) throw err;
    });

    connection.end();

    console.log("Your order has been placed, your order total is: " + total);
}
}