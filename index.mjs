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
            message: 'Which license will cover your project?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add A Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role'
            ],
        },
    ])

    switch (answers.mainMenu) {
        case 'View All Departments':
            getDepartments();
            break;
        case 'View All Roles':
            
            break;
        case 'View All Employees':
            
            break;
        case 'Add A Department':
            
            break;
        case 'Add a Role':
            
            break;
        case 'Add an Employee':
            
            break;
        case 'Update an Employee Role':
            
            break;
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
    const sql = `SELECT name as Departments FROM department`;
    db.query(sql, (err, rows) => {
        if (err) {
        err.status(500).json({ error: err.message });
            return;
        } else {
            console.log(``);
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

//view all employee --- formatted table with employee data
//employee ids
//first names
//last names
//job titles
//departments
//salaries
//and managers that the employees report to

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
