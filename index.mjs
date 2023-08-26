//write inquirer code

import inquirer from 'inquirer';

import mysql from 'mysql2';

import { getDepartments } from './assets/getDepartments.mjs'
import { getRoles } from './assets/getRoles.mjs'
import { getEmployees } from './assets/getEmployees.mjs'
import { addDepartment } from './assets/addDepartment.mjs'
import { addRole } from './assets/addRole.mjs';
import { addEmployee } from './assets/addEmployee.mjs';
import { updateEmployee } from './assets/updateEmployee.mjs'


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

export const callMainMenu = async () => {

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
        }
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
            addDepartment();
            break;
        case 'Add a Role':
            addRole();
            break;
        case 'Add an Employee':
            addEmployee();
            break;
        case 'Update an Employee Role':
            updateEmployee();
            break;
        case 'Quit':
            process.exit();
    }
}

//initiate main menu
callMainMenu();
