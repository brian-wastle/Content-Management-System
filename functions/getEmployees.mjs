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

export const getEmployees = async () => {
    const sql = `SELECT 
    E1.id AS ID,
    E1.first_name AS First_Name,
    E1.last_name AS Last_Name,
    role.title AS Title,
    department.name AS Department,
    role.salary AS Salary,
    CONCAT(E2.first_name, ' ', E2.last_name) AS Manager
FROM
    employee E1
        LEFT JOIN
    employee E2 ON E1.manager_id = E2.id
        INNER JOIN
    role ON E1.role_id = role.id
        INNER JOIN
    department ON role.department_id = department.id;`;
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