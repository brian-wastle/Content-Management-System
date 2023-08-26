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