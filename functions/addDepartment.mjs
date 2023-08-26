import inquirer from 'inquirer';

import mysql from 'mysql2';

import { getDepartments } from './getDepartments.mjs';

import { db } from './dbConnect.mjs';

//add a department ---
//prompted to enter the name of the department
//that department is added to the database

export const addDepartment = async () => {

    let answers = await inquirer
    .prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department?'
        }
    ]);

    // answers.departmentName
    const sql = `INSERT INTO department (name)
    VALUES (?)`;
    const params = answers.departmentName;
    db.query(sql, params, (err, rows) => {
        if (err) {
            err.log(err);
                return;
        } else {
            getDepartments();
        }
    });

}