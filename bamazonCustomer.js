const mysql = require('mysql');
const inquirer = require('inquirer');
const columnify = require('columnify')

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect((err) => {
    if (err) throw err;
    startApp();
})

startApp = () => {
    connection.query("SELECT * FROM products", (err, database) => {
        if (err) throw err;

        // for (count in database) {
        //     console.log(`ID: ${database[count].id}\tProduct Name:${database[count].product_name}\tAvailable Product:${database[count].stock_quantity}`)
        // }

        const columns = columnify(database, {
            columns: ['id', 'product_name', 'price', 'stock_quantity']
        })
        console.log(`\n${columns}\n`) // npm install columnify

        inquirer.prompt([
            {
                type: "input",
                message: "What is the ID of the item you want?",
                name: "itemId",
                validate: validate = (value) => {
                    let isValid = !isNaN(value);
                    // console.log(isValid)
                    return isValid || "Not a valid ID number, please try again.";
                }
            },
            {
                type: "input",
                message: "How many do you need?",
                name: "itemQuantity",
                validate: validate = (value) => {
                    let isValid = !isNaN(value);
                    return isValid || "Not a valid quantity, please try again."; // return || returns left value is truthy else right value
                }
            }
        ]).then((response) => {
            // console.log(answer)
            connection.query(`SELECT * FROM products WHERE id = ${response.itemId}`, (err, database) => {
                if (err) throw err
                if (database[0].stock_quantity < response.itemQuantity) {
                    buyOut(response.itemId, response.itemQuantity, database[0].stock_quantity, database[0].price);
                }
                else if (database[0].stock_quantity > 0) {
                    customerCall(response.itemId, response.itemQuantity, database[0].stock_quantity, database[0].price);
                    // console.log(database[0].stock_quantity);
                }
                else {
                    console.log("\n\nInsufficient Stock for Purchase, try again.\n\n");
                    startApp();
                }
            })
        })
    })
}

//user item, user # call, database item#
customerCall = (itemId, itemQuantity, stockQuantity, unitPrice) => {
    let change = `UPDATE products SET stock_quantity = ${stockQuantity - itemQuantity} WHERE id = ${itemId}`
    connection.query(change, function (err, result) {
        if (err) throw err;
        transactionTotal(itemQuantity, unitPrice);
    });
    startApp(); //Recursive Call
}

buyOut = (itemId, itemQuantity, stockQuantity, unitPrice) => {
    let totalCharge = itemQuantity * unitPrice
    let futureCharge = totalCharge - (stockQuantity * unitPrice)
    console.log(`\n\nYou've wanted to purchase more than stock holds, \nwe will ship you the first "${stockQuantity}" items and backlog the \nrest "${itemQuantity - stockQuantity}" items for future shipment.\nTotal charge is $${totalCharge} current balance due right now is $${totalCharge - futureCharge}`)

    let change = `UPDATE products SET stock_quantity = 0 WHERE id = ${itemId}`
    connection.query(change, function (err, result) {
        if (err) throw err;
        transactionTotal(itemQuantity, unitPrice);
    });
    startApp(); //Recursive Call
}

transactionTotal = (quantityCall, unitPrice) => {
    console.log(`Total for this transaction: $${quantityCall * unitPrice}`)
}