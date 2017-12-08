// manager view

module.exports = function managerView(connection) {

    var mysql = require("mysql");
    var inquirer = require("inquirer");

    var mainView = require("./main.js");

    require("console.table");

    // set up connection to server
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,

        // Your username
        user: "root",

        // Your password
        password: "",
        database: "bamazon_db"
    });

    // connect to server
    connection.connect(function(err) {
        if (err) throw err;
        manageProducts();
    });

    function manageProducts() {
        inquirer.prompt({
            name: "options",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Products"]
        }).then(function(answer) {
            switch (answer.options) {
                case "View Products for Sale":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    viewLow();
                    break;

                case "Add to Inventory":
                    addTo();
                    break;

                case "Add New Products":
                    addNew();
                    break;
            }
        });
    }

    function viewProducts() {
        //the app should list every available item:
        //the item IDs, names, prices, and quantities.
        var query = "SELECT item_id, item_name, item_price, stock_quantity FROM products";
        connection.query(query, function(err, res) {
            console.table(res);
            manageProducts();
        });
    }

    function viewLow() {
        //list all items with less than 5 units available
        var query = "SELECT item_id, item_name, item_price, stock_quantity FROM products WHERE " +
            "stock_quantity < 5";
        connection.query(query, function(err, res) {
            if (res.length == 0) {
                console.log("All items have at least 5 units");
            }
            else {
                console.table(res);
            }
            manageProducts();
        });
    }

    function addTo() {
        // your app should display a prompt that will let
        //the manager "add more" of any item currently in the store.

        // first display table
        var query = "SELECT item_id, item_name, item_price, stock_quantity FROM products";
        connection.query(query, function(err, res) {
            console.table(res);
        });

        // then let them choose the product they need more of
        inquirer.prompt([{
            name: "ID",
            type: "input",
            message: "Select the item ID to increase quantity:"
        }, {
            name: "amount",
            type: "input",
            message: "Enter the number of units to add:"
        }]).then(function(answer) {
            connection.query("UPDATE products SET stock_quantity = stock_quantity + " + answer.amount + " WHERE ?", [
                    { item_id: answer.ID }
                ],
                function(err) {
                    if (err) throw err;
                    console.log("Inventory is updated.");
                    manageProducts();
                });
        });
    }

    function addNew() {
        //it should allow the manager to add a completely new product
        //to the store.
        //insert name, dept, price, quantity
        inquirer.prompt([{
                name: "name",
                type: "input",
                message: "Product name: "
            },
            {
                name: "department",
                type: "input",
                message: "Department name: "
            }, {
                name: "price",
                type: "input",
                message: "Unit price: "
            }, {
                name: "number",
                type: "input",
                message: "Number of units: "
            }
        ]).then(function(answer) {
            connection.query("INSERT INTO products(item_name, department_name, item_price, stock_quantity) VALUES('" +
                answer.name + "', '" + answer.department + "', " + answer.price + ", " + answer.number + ")");
            console.log("New product has been added.");
            manageProducts();
        });
    }
};
