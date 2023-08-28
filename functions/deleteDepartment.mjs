import inquirer from 'inquirer';

import { getEmployees } from './getEmployees.mjs';

import { db } from './dbConnect.mjs';

//add an employee ---
//prompted to enter the employee’s first name, last name, role, and manager
//that employee is added to the database

export const deleteDepartment = async () => {

    const departmentChoices = async () => {
        const departmentQuery = `SELECT department.name as name, department.id AS value FROM department;`;
        const departments = await db.promise().query(departmentQuery);
        return departments[0];
    };

    let answers = await inquirer
    .prompt([
        {
            type: 'list',
            name: 'departmentName',
            message: "Which department would you like to delete?",
            choices: await departmentChoices(),
            when(answers) {
                    return(answers);
                },
        },
    ]);

    console.log(answers)
    const sql = `SELECT 
    COUNT(employee.first_name) as Employee,
    department.name AS Department
FROM
    employee
        INNER JOIN
    role ON employee.role_id = role.id
        INNER JOIN
    department ON role.department_id = department.id
    WHERE role.department_id = '${answers.departmentName}'
;`;
    db.query(sql, (err, rows) => {
        if (err) {
        err.log(err);
            return;
        } else {
            console.log(rows)
            if (rows.employee > 0)
                {
                removeDepartment();
                reassignDepartment();
                } else {
                removeDepartment();
                }
        }
    });






    const reassignDepartment = async () => {
        const departmentChoices = async () => {
            const departmentQuery = `SELECT department.name as name, department.id AS value FROM department;`;
            const departments = await db.promise().query(departmentQuery);
            return departments[0];
        };
    
        let answers = await inquirer
        .prompt([
            {
                type: 'list',
                name: 'departmentName',
                message: "There are employees in this department. To which department would you like them to be reassigned?",
                choices: await departmentChoices(),
                when(answers) {
                        return(answers);
                    },
            },
        ]);



    };



    
    const removeDepartment = async () => {
        const sql = `DELETE FROM department WHERE name = ?`;
        const params = [answers.departmentName];
        db.query(sql, (err, rows) => {
            if (err) {
            err.log(err);
                return;
            } else {
                getDepartments();
            }
        });


    };



}