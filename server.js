//Imports neccessary for application
const mysql = require('mysql2');
const inquirer = require('inquirer');

// Server and database connection specifics
const server = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Connect',
    database: 'company_db',
});

//Initialization of the server
server.connect((err) => {
    if(err) throw err;
    console.log('Welcome to the company database!');

    init();
});

//Function to initialize the app and present users with different choices
function init() {
    inquirer.prompt({
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
        //Switch case to execute function behind user choice
        .then((choice) => {
            switch (choice.action) {
                case 'View All Departments':
                    viewDepartments();
                    break;
                case 'View All Roles':
                    viewRoles();
                    break;
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'Add A Department':
                    addDepartment();
                    break;
                case 'Add A Role':
                    addRole();
                    break;
                case 'Add An Employee':
                    addEmployee();
                    break;
                case 'Update An Employee':
                    updateEmployee();
                    break;
            }
        })
}

function viewDepartments() {

}

function viewRoles() {

}

function viewEmployees() {

}

function addDepartment() {

}

function addRole() {

}

function addEmployee() {

}

function updateEmployee() {

}