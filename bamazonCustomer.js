var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    displayProducts();
});

// show the user the inventory
// see how to insert $ into item_price
// see how to change column titles
function displayProducts() {
    var query = "SELECT item_id, item_name, item_price FROM products";
    connection.query(query, function(err, res) {
        console.table(res);
        placeOrder();
    });
}

// prompt them to buy!
function placeOrder() {
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "What ID would you like to purchase?"
    }, {
        name: "quantity",
        type: "input",
        message: "How many units would you like?"
    }]).then(function(answer) {

        var query = "SELECT item_name, item_price, stock_quantity FROM products WHERE ?";
        connection.query(query, { item_id: answer.id },

            function(err, res) {

                // if the number of units purchased is less than number available
                // then update SQL database and show user the total cost

                var order = answer.quantity;

                //console.log("quantity desired is: " + order);
                //console.log("units available is: " + res[0].stock_quantity);

                if (order <= res[0].stock_quantity) {
                    console.log("In stock! Finalizing your total...");
                    //update SQL database
                    var newQuantity = res[0].stock_quantity - order;
                    var query = "UPDATE products SET ? WHERE ?";
                    connection.query(query, [{ stock_quantity: newQuantity }, { item_id: answer.id }],
                        function(error) {
                            if (error) throw err;
                            console.log("Your total is: $" + (res[0].item_price * order));
                        });
                    //console.log("Your total is: $" + (res[0].item_price * order));
                }

                // if the number of units purchased is more than number available
                // console.log("sorry, insufficient quantity") and prevent order

                else {
                    console.log("We are sorry. Currently there is an insufficient quantity available.");
                }
            });
    });
}
