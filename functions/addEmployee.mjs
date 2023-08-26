import inquirer from 'inquirer';

import mysql from 'mysql2';

import { getEmployees } from './getEmployees.mjs';

import { db } from './dbConnect.mjs';

//add an employee ---
//prompted to enter the employee’s first name, last name, role, and manager
//that employee is added to the database

export const addEmployee = async () => {

    const roleChoices = async () => {
        const roleQuery = `SELECT 
CONCAT(role.title , " -- ", department.name) as name, 
role.id AS value FROM role
INNER JOIN department ON role.department_id = department.id;`;
        const roles = await db.promise().query(roleQuery);
        return roles[0];
    };

    const managerChoices = async () => {
        const managerQuery = `SELECT 
CONCAT(employee.first_name , " ", employee.last_name, " -- ", department.name) as name, 
employee.id AS value 
FROM employee 
INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON role.department_id = department.id
WHERE employee.manager_id is NULL;`;
        const managers = await db.promise().query(managerQuery);
        return managers[0];
    };

    let answers = await inquirer
    .prompt([
        {
            type: 'input',
            name: 'employeeFirstName',
            message: `What is the employee's first name?`
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: `What is the employee's last name?`
        },
        {
            type: 'list',
            name: 'departmentName',
            message: `What is the employee's role?`,
            choices: await roleChoices()
        },
        {
            type: 'list',
            name: 'managerName',
            message: `Who is the employee's manager?`,
            choices: await managerChoices(),
            when(answers) {
                    return(answers);
                },
        }
    ]);

    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`;
    const params = [answers.employeeFirstName, answers.employeeLastName, answers.departmentName, answers.managerName];
    db.promise().query(sql, params, (err, rows) => {
        if (err) {
            err.log(err);
                return;
        } else {
            return;
        }
    });
    getEmployees();
}