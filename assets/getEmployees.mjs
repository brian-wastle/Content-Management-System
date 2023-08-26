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

//view all employees --- 
//employee ids
//first names
//last names
//job titles
//departments
//salaries
//and managers that the employees report to

export const getEmployees = async () => {
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