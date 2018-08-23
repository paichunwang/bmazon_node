const mysql = require('mysql');
const inquirer = require('inquirer');
const columnify = require('columnify')

let count = 0;

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
    inquirer.prompt([
        {
            type: "list",
            message: "Please choose a action..",
            name: "actionChoice",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then((response) => {
        switch (response.actionChoice) {
            case 'View Products for Sale':
                productSale();
                break;
            case 'View Low Inventory':
                lowInventory();
                break;
            case 'Add to Inventory':
                addInventory();
                break;
            case 'Add New Product':
                addProduct();
                break;
        }
    })
}

productSale = () => {
    connection.query("SELECT * FROM products", (err, database) => {
        if (err) throw err;

        const columns = columnify(database, {
            columns: ['id', 'product_name', 'price', 'stock_quantity']
        })
        console.log(`\n${columns}\n`) // npm install columnify
        startApp();
    });
}

lowInventory = () => {
    connection.query(`SELECT * FROM products WHERE stock_quantity <= 5`, (err, database) => {
        if (err) throw err;
        if (database == 0) {
            console.log("Nothing below 5 in stock.")
        }
        else {
            const columns = columnify(database, {
                columns: ['id', 'product_name', 'price', 'stock_quantity']
            })
            console.log(`\n${columns}\n`) // npm install columnify
            startApp();
        }
    });
}

addInventory = () => {
    let array = [];
    connection.query(`SELECT product_name FROM products`, (err, database) => {
        if (err) throw err;
        for (count in database) {
            array.push(database[count].product_name)
        }
        inquirer.prompt([
            {
                type: "list",
                message: "Which item to add stock: ",
                name: "choice",
                choices: array
            },
            {
                type: "input",
                message: "How much stock to add: ",
                name: "stock"
            }
        ]).then((update) => {
            const dataCall = `SELECT stock_quantity FROM products WHERE product_name = "${update.choice}"`
            connection.query(dataCall, (err, result) => {
                if (err) throw err;
                let newStock = result[0].stock_quantity + parseInt(update.stock)
                const change = `UPDATE products SET stock_quantity = "${newStock}" WHERE product_name = "${update.choice}"`
                connection.query(change, function (err, result) {
                    if (err) throw err;
                    console.log(`\nAdded ${update.stock} stock to '${update.choice}'\n`);
                    startApp();
                });
            })
        })
    });
}

addProduct = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Name of Product: ",
            name: "name"
        },
        {
            type: "input",
            message: "Responsible department: ",
            name: "department"
        },
        {
            type: "input",
            message: "Price per unit: ",
            name: "price"
        },
        {
            type: "input",
            message: "Product stock: ",
            name: "stock"
        }
    ]).then((r) => {
        console.log("Add Item Ran")
    })

}