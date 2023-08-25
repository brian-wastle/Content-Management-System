//write inquirer code

import inquirer from 'inquirer';

import cTable from 'console.table';

import mysql from 'mysql2';


const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: '',
      database: 'organization_db'
    },
    console.log(`Connected to the organization_db database.`)
  );

//set up inquirer

const callMainMenu = async () => {

    let answers = await inquirer
    .prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add A Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Quit'
            ],
        },
    ])

    switch (answers.mainMenu) {
        case 'View All Departments':
            getDepartments();
            break;
        case 'View All Roles':
            getRoles();
            break;
        case 'View All Employees':
            getEmployees();
            break;
        case 'Add A Department':
            
            break;
        case 'Add a Role':
            
            break;
        case 'Add an Employee':
            
            break;
        case 'Update an Employee Role':
            
            break;
        case 'Quit':
            process.exit();
    }
}

callMainMenu();

//view all departments
//view all roles
//view all employees
//add a department
//add a role
//add an employee
//update an employee role


//view all departments --- formatted table
//department names 
//department ids


const getDepartments = async () => {
    const sql = `SELECT id as ID, name as Name FROM department`;
    db.query(sql, (err, rows) => {
        if (err) {
        err.status(500).json({ error: err.message });
            return;
        } else {
            console.log(``);
            console.log(`Departments`);
            console.table(rows);
            callMainMenu();
        }
    });
}


//view all roles ---
//the job title
//role id
//the department that role belongs to
//the salary for that role

const getRoles = async () => {
    const sql = `SELECT role.id as ID, 
    title as Title, 
    department.name as Department, 
    salary as Salary 
    FROM role
    INNER JOIN department
    on role.department_id = department.id;`;
    db.query(sql, (err, rows) => {
        if (err) {
        err.status(500).json({ error: err.message });
            return;
        } else {
            console.log(``);
            console.log(`Roles`);
            console.table(rows);
            callMainMenu();
        }
    });
}



//view all employee --- formatted table with employee data
//employee ids
//first names
//last names
//job titles
//departments
//salaries
//and managers that the employees report to

const getEmployees = async () => {
    const sql = `SELECT E1.id as ID,
    E1.first_name as First_Name, 
    E1.last_name as Last_Name, 
    role.title AS Title,
    department.name AS Department,
    role.salary AS Salary,
    CONCAT(E2.first_name , " ", E2.last_name) AS ManagerName
    FROM employee E1
    LEFT JOIN employee E2 ON E1.manager_id = E2.id
    INNER JOIN role
    on E1.role_id = role.id
    INNER JOIN department
    on role.department_id = department.id;`;
    db.query(sql, (err, rows) => {
        if (err) {
        err.status(500).json({ error: err.message });
            return;
        } else {
            console.log(``);
            console.log(`Employees`);
            console.table(rows);
            callMainMenu();
        }
    });
}

//add a department ---
//prompted to enter the name of the department
//that department is added to the database

//add a role ---
//prompted to enter the name, salary, and department for the role
//that role is added to the database

//add an employee ---
//prompted to enter the employee’s first name, last name, role, and manager
//that employee is added to the database

//update an employee role ---
//prompted to select an employee to update and their new role
//this information is updated in the database 
