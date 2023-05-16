const mysql = require('mysql2');
const inquirer = require('inquirer');

const server = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Connect',
    database: 'company_db',
});

server.connect((err) => {
    if(err) throw err;
    console.log('Welcome to the company database!');

    init();
});

function init() {
    inquirer
        .prompt({
            name: 'options',
            type: 'list',
            message: 'Select and option.',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add A Department',
                'Add A Role',
                'Add An Employee',
                'Update An Employee'
            ],
        })
};
