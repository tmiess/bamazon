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
        var query = "SELECT item_id, item_name, item_price, stock_quanitity FROM products";
        connection.query(query, function(err, res) {
            console.table(res);
            manageProducts();
        });
    }

    function viewLow() {
        //then it should list all items with an inventory
        //count lower than five.
    }

    function addTo() {
        // your app should display a prompt that will let
        //the manager "add more" of any item currently in the store.
    }

    function addNew() {
        //it should allow the manager to add a completely new product
        //to the store.
    }
};
