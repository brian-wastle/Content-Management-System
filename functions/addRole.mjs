import inquirer from 'inquirer';

import mysql from 'mysql2';

import { getRoles } from './getRoles.mjs';

import { db } from './dbConnect.mjs';

//add a role ---
//prompted to enter the name, salary, and department for the role
//that role is added to the database

export const addRole = async () => {

    const departmentChoices = async () => {
        const departmentQuery = `SELECT department.name, department.id AS value FROM department;`;
        const departments = await db.promise().query(departmentQuery);
        return departments[0];
    };

    let answers = await inquirer
    .prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salaryLevel',
            message: 'What is the starting salary?'
        },
        {
            type: 'list',
            name: 'departmentName',
            message: "To which department does this role belong?",
            choices: await departmentChoices(),
            when(answers) {
                    return(answers);
                },
        }
    ]);

    const sql = `INSERT INTO role (title, salary, department_id)
    VALUES (?,?,?)`;
    const params = [answers.roleName, answers.salaryLevel, answers.departmentName];
    db.promise().query(sql, params, (err, rows) => {
        if (err) {
            err.log(err);
                return;
        } else {
            return;
        }
    });
    getRoles();
}