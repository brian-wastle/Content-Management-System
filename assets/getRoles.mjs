import inquirer from 'inquirer';

import cTable from 'console.table';

import mysql from 'mysql2';

import {callMainMenu} from '../index.mjs'

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

//view all roles ---
//the job title
//role id
//the department that role belongs to
//the salary for that role

export const getRoles = async () => {
    const sql = `SELECT role.id as ID, 
    title as Title, 
    department.name as Department, 
    salary as Salary 
    FROM role
    INNER JOIN department
    on role.department_id = department.id;`;
    db.query(sql, (err, rows) => {
        if (err) {
        err.log(err);
            return;
        } else {
            console.log(``);
            console.log(`Roles`);
            console.table(rows);
            callMainMenu();
        }
    });
}