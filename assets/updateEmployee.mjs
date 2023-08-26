import inquirer from 'inquirer';

import mysql from 'mysql2';

import { getEmployees } from './getEmployees.mjs'

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


//update an employee role ---
//prompted to select an employee to update and their new role
//this information is updated in the database 

export const updateEmployee = async () => {

    const employeeChoices = async () => {
        const employeeQuery = `SELECT 
CONCAT(employee.first_name , " ", employee.last_name) as name, 
employee.id AS value 
FROM employee;`;
        const employees = await db.promise().query(employeeQuery);
        return employees[0];
    };
    
    const roleChoices = async () => {
        const roleQuery = `SELECT 
CONCAT(role.title , " -- ", department.name) as name, 
role.id AS value FROM role
INNER JOIN department ON role.department_id = department.id;`;
        const roles = await db.promise().query(roleQuery);
        return roles[0];
    };

    let answers = await inquirer
        .prompt([
            {
                type: 'list',
                name: 'employeeName',
                message: `Which employee would you like to change?`,
                choices: await employeeChoices(),
            },
            {
                type: 'list',
                name: 'roleName',
                message: `What is the employee's role?`,
                choices: await roleChoices(),
                when(answers) {
                        return(answers);
                    },
            }
        ]);


    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [answers.roleName, answers.employeeName];

    db.query(sql, params, (err, rows) => {
        if (err) {
        err.log(err);
        } else {
        return;
        }
    });
    getEmployees();
}