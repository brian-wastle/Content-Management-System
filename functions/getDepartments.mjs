import cTable from 'console.table';

import {callMainMenu} from '../index.mjs'

import { db } from './dbConnect.mjs';

  //view all departments --- formatted table
//department names 
//department ids


export const getDepartments = async () => {
    const sql = `SELECT id as ID, name as Name FROM department`;
    db.query(sql, (err, rows) => {
        if (err) {
        err.log(err);
            return;
        } else {
            console.log(``);
            console.log(`Departments`);
            console.table(rows);
            callMainMenu();
        }
    });
}