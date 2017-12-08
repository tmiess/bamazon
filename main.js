// this will be the starting point where the user can decide
// how they would like to use the application

var mysql = require("mysql");
var inquirer = require("inquirer");

var customerView = require('./bamazonCustomer.js');
var managerView = require('./bamazonManager.js');

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
    // console.log("bamazon_db connected");
    if (err) throw err;
    menu();
});

function menu() {
    console.log("menu is connected");
    inquirer.prompt({
        name: "options",
        type: "list",
        message: "Please identify yourself:",
        choices: ["Customer", "Manager"]
    }).then(function(answer) {
        switch (answer.options) {
            case "Customer":
                connection.connect(customerView);
                break;

            case "Manager":
                connection.connect(managerView);
                break;
        }
    });
}
