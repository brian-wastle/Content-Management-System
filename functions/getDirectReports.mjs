import inquirer from 'inquirer';

import cTable from 'console.table';

import {callMainMenu} from '../index.mjs'

import { db } from './dbConnect.mjs';

//view all employees --- 
//employee ids
//first names
//last names
//job titles
//departments
//salaries
//and managers that the employees report to

export const getDirectReports = async () => {

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
            type: 'list',
            name: 'managerName',
            message: `Whose direct reports would you like to view?`,
            choices: await managerChoices(),
            when(answers) {
                    return(answers);
                },
        }
    ]);



    const sql = `SELECT 
    E1.id as Employee_ID,
    CONCAT(E2.first_name, ' ', E2.last_name) AS Manager_Name,
    CONCAT(E1.first_name, ' ', E1.last_name) AS Employee_Name
FROM
    employee E1
        LEFT JOIN
    employee e2 ON E1.manager_id = E2.id
WHERE
    E1.manager_id IS NOT NULL
        && E1.manager_id = ${answers.managerName};`;
    db.query(sql, (err, rows) => {
        if (err) {
        err.log(err);
            return;
        } else {
            console.log(``);
            console.log(`Employees`);
            console.table(rows);
            callMainMenu();
        }
    });
}