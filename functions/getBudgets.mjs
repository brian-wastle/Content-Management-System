import cTable from 'console.table';

import {callMainMenu} from '../index.mjs'

import { db } from './dbConnect.mjs';

  //view all departments --- formatted table
//department names 
//department ids


export const getBudgets = async () => {
    const sql = `SELECT 
    department.id AS Department_Id,
    department.name AS Name,
    SUM(role.salary) AS Total_Budget
FROM
    department
        INNER JOIN
    role ON role.department_id = department.id
        INNER JOIN
    employee ON employee.role_id = role.id
GROUP BY role.department_id;`;
    db.query(sql, (err, rows) => {
        if (err) {
        err.log(err);
            return;
        } else {
            console.log(``);
            console.log(`Budget by Department`);
            console.table(rows);
            callMainMenu();
        }
    });
}