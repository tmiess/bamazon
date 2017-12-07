# bamazon
--create new database called "bamazon_DB" with table called "products"
--products table will have each of the following columns:
    --item_id (unique id for each product)
    --product_name (name of product)
    --department_name
    --price
    --stock_quantity
--populate database with 10 different products

--then create node application called "bamazonCustomer.js"
--this will display all of the items available for sale
    --include ids, names, prices
--then it will prompt users with two messages
1)ask them the ID of the product they would like to buy
2)ask how many units of the product they would like to buy

--once customer places order, application should check if your store has enough
of the product to meet the customer's request
--if not, the app should log a phrase like "insufficient quantity" and then
prevent the order from going through
--if so, fulfill customers order:
    --update SQL database to reflect the remaining quantity
    --once update goes through, show customer the total cost of purchase