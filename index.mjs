//write inquirer code

import inquirer from 'inquirer';

import { getDepartments } from './functions/getDepartments.mjs'
import { getRoles } from './functions/getRoles.mjs'
import { getEmployees } from './functions/getEmployees.mjs'
import { addDepartment } from './functions/addDepartment.mjs'
import { addRole } from './functions/addRole.mjs';
import { addEmployee } from './functions/addEmployee.mjs';
import { updateEmployee } from './functions/updateEmployee.mjs'
import { getBudgets } from './functions/getBudgets.mjs'
import { getDirectReports } from './functions/getDirectReports.mjs'
import { deleteDepartment } from './functions/deleteDepartment.mjs'


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
                'View All Direct Reports',
                'View All Budgets',
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
        case 'View All Direct Reports':
            getDirectReports();
            break;
        case 'View All Budgets':
            getBudgets();
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
