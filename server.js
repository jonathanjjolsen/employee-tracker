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
    if (err) throw err;
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
    const pull = 'SELECT * FROM departments';
    server.query(pull, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}

function viewRoles() {
    const pull = 'SELECT title, department_id, salary, departments.department_name FROM roles JOIN departments ON roles.department_id = departments.id';
    server.query(pull, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}

function viewEmployees() {
    const pull = 'SELECT first_name, last_name, roles.title FROM employees JOIN roles ON employees.role_id = roles.id';
    server.query(pull, (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}

function addDepartment() {
    inquirer.prompt({
        name: 'deptAdd',
        type: 'input',
        message: 'Type new department below:'
    })
        .then((userResponse) => {
            const update = `INSERT INTO departments (department_name) VALUES ('${userResponse.deptAdd}')`;
            server.query(update, err => {
                if (err) throw err;
                console.log(`A new department "${userResponse.deptAdd}" has been added. Please navigate to the departments tab and verify creation.`)
                init();
            });
        });
};

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'Please enter a name for the new role:'
        },
        {
            type: 'input',
            name: 'department',
            message: 'Please enter the respective id number for the department:',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please enter a salary for this role:'
        }
    ])
        .then((userResponse) => {
            const update = `INSERT INTO roles (title, department_id, salary) VALUES (?, ?, ?)`;
            server.query(update, [
                userResponse.role,
                userResponse.department,
                userResponse.salary
            ]);
            init();
        })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Please enter the employees first name:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Please enter the employees last name:'
        },
        {
            type: 'input',
            name: 'role',
            message: 'Please enter the role ID#:'
        }
    ])
        .then((userResponse) => {
            const update = `INSERT INTO employees (first_name, last_name, role_id) VALUES (?, ?, ?)`;
            server.query(update, [
                userResponse.firstName,
                userResponse.lastName,
                userResponse.role
            ]);
            init();
        })
}

function updateEmployee() {
    const pullEmployees =
        "SELECT employees.id, employees.first_name, employees.last_name, roles.title FROM employees LEFT JOIN roles ON employees.role_id = roles.id";
    const pullRoles = "SELECT * FROM roles";
    server.query(pullEmployees, (err, updateEmployees) => {
        if (err) throw err;
        server.query(pullRoles, (err, updateRoles) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "employee",
                        message: "Select the employee to update:",
                        choices: updateEmployees.map(
                            (employee) =>
                                `${employee.first_name} ${employee.last_name}`
                        ),
                    },
                    {
                        type: "list",
                        name: "role",
                        message: "Select the new role:",
                        choices: updateRoles.map((role) => role.title),
                    },
                ])
                .then((userResponse) => {
                    const employee = updateEmployees.find(
                        (employee) =>
                            `${employee.first_name} ${employee.last_name}` ===
                            userResponse.employee
                    );
                    const role = updateRoles.find(
                        (role) => role.title === userResponse.role
                    );
                    const pull =
                        "UPDATE employees SET role_id = ? WHERE id = ?";
                    server.query(pull, [role.id, employee.id], err => {
                            if (err) throw err;
                            console.log(
                                `${employee.first_name} ${employee.last_name}'s role has been update. Please navigate to the employees section to verify.`
                            );
                            init();
                        }
                    )
                })
        })
    })
}
