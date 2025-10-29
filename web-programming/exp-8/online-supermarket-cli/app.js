const mysql = require('mysql2');
const inquirer = require('inquirer').default;
const Table = require('cli-table3');

const connection = mysql.createConnection({ 
host: 'localhost', 
user: 'root', 
password: 'adhi@123', 
database: 'web_practical', 
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
    startSearch();
});

function startSearch() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'searchQuery',
                message: 'Enter product ID or name:',
            },
        ])
        .then((answers) => {
            const query = `SELECT * FROM products WHERE id LIKE ? OR name LIKE ?`;
            const searchTerm = `%${answers.searchQuery}%`;

            connection.query(query, [searchTerm, searchTerm], (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    connection.end();
                    return;
                }

                if (results.length === 0) {
                    console.log('No products found.');
                } else {
                    displayProductDetails(results);
                }

                connection.end();
            });
        });
}

function displayProductDetails(products) {
    const table = new Table({
        head: ['ID', 'Name', 'Brand', 'Price'],
        colWidths: [10, 30, 20, 10],
    });

    products.sort((a, b) => a.price - b.price);

    products.forEach((product) => {
        table.push([product.id, product.name, product.brand, `$${product.price}`]);
    });

    console.log(table.toString());
}
