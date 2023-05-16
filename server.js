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
async function init() {
    const choice = await inquirer.prompt({
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
            switch (choice.options) {
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
}

function viewDepartments() {
    const pull = 'SELECT * FROM departments;';
    server.query(pull, (err, res) => {
        if(err) throw err;
        console.table(res);
        init();
    })
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