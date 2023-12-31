import cTable from 'console.table';

import {callMainMenu} from '../index.mjs'

import { db } from './dbConnect.mjs';

//view all roles ---
//the job title
//role id
//the department that role belongs to
//the salary for that role

export const getRoles = async () => {
    const sql = `SELECT 
    role.id AS ID,
    title AS Title,
    department.name AS Department,
    salary AS Salary
FROM
    role
        INNER JOIN
    department ON role.department_id = department.id;`;
    db.query(sql, (err, rows) => {
        if (err) {
        err.log(err);
            return;
        } else {
            console.log(``);
            console.log(`----Roles----`);
            console.table(rows);
            callMainMenu();
        }
    });
}