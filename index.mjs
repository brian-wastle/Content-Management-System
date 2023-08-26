//write inquirer code

import inquirer from 'inquirer';

import cTable from 'console.table';

import mysql from 'mysql2';


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

//set up inquirer

const callMainMenu = async () => {

    let answers = await inquirer
    .prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add A Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Quit'
            ],
        }
    ])

    switch (answers.mainMenu) {
        case 'View All Departments':
            getDepartments();
            break;
        case 'View All Roles':
            getRoles();
            break;
        case 'View All Employees':
            getEmployees();
            break;
        case 'Add A Department':
            addDepartment();
            break;
        case 'Add a Role':
            addRole();
            break;
        case 'Add an Employee':
            addEmployee();
            break;
        case 'Update an Employee Role':
            updateEmployee();
            break;
        case 'Quit':
            process.exit();
    }
}

//initiate main menu
callMainMenu();

//view all departments
//view all roles
//view all employees
//add a department
//add a role
//add an employee
//update an employee role


//view all departments --- formatted table
//department names 
//department ids


const getDepartments = async () => {
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

//view all roles ---
//the job title
//role id
//the department that role belongs to
//the salary for that role

const getRoles = async () => {
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

//view all employees --- 
//employee ids
//first names
//last names
//job titles
//departments
//salaries
//and managers that the employees report to

const getEmployees = async () => {
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

//add a department ---
//prompted to enter the name of the department
//that department is added to the database

const addDepartment = async () => {

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

//add a role ---
//prompted to enter the name, salary, and department for the role
//that role is added to the database

const addRole = async () => {

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

//add an employee ---
//prompted to enter the employee’s first name, last name, role, and manager
//that employee is added to the database

const addEmployee = async () => {

    const roleChoices = async () => {
        const roleQuery = `SELECT 
CONCAT(role.title , " -- ", department.name) as name, 
role.id AS value FROM role
INNER JOIN department ON role.department_id = department.id;`;
        const roles = await db.promise().query(roleQuery);
        return roles[0];
    };

    const managerChoices = async () => {
        const managerQuery = `SELECT 
CONCAT(employee.first_name , " ", employee.last_name, " -- ", department.name) as name, 
employee.id AS value 
FROM employee 
INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON role.department_id = department.id
WHERE employee.manager_id is NULL;`;
        const managers = await db.promise().query(managerQuery);
        return managers[0];
    };

    let answers = await inquirer
    .prompt([
        {
            type: 'input',
            name: 'employeeFirstName',
            message: `What is the employee's first name?`
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: `What is the employee's last name?`
        },
        {
            type: 'list',
            name: 'departmentName',
            message: `What is the employee's role?`,
            choices: await roleChoices()
        },
        {
            type: 'list',
            name: 'managerName',
            message: `Who is the employee's manager?`,
            choices: await managerChoices(),
            when(answers) {
                    return(answers);
                },
        }
    ]);

    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`;
    const params = [answers.employeeFirstName, answers.employeeLastName, answers.departmentName, answers.managerName];
    db.promise().query(sql, params, (err, rows) => {
        if (err) {
            err.log(err);
                return;
        } else {
            return;
        }
    });
    getEmployees();
}

//update an employee role ---
//prompted to select an employee to update and their new role
//this information is updated in the database 

const updateEmployee = async () => {

    const employeeChoices = async () => {
        const employeeQuery = `SELECT 
    CONCAT(role.title , " -- ", department.name) as name, 
    role.id AS value FROM role
    INNER JOIN department ON role.department_id = department.id;`;
        const employees = await db.promise().query(employeeQuery);
        return employees[0];
    };
    
    const roleChoices = async () => {
        const roleQuery = `SELECT 
    CONCAT(role.title , " -- ", department.name) as name, 
    role.id AS value FROM role
    INNER JOIN department ON role.department_id = department.id;`;
        const roles = await db.promise().query(roleQuery);
        return roles[0];
    };

    let answers = await inquirer
        .prompt([
            {
                type: 'list',
                name: 'employeeName',
                message: `Which employeew would you like to change?`,
                choices: await employeeChoices(),
            },
            {
                type: 'list',
                name: 'roleName',
                message: `What is the employee's role?`,
                choices: await roleChoices(),
                when(answers) {
                        return(answers);
                    },
            }
        ]);


    const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
    const params = [req.body.review, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
        res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
        res.json({
            message: 'Movie not found'
        });
        } else {
        res.json({
            message: 'success',
            data: req.body,
            changes: result.affectedRows
        });
        }
    });
    getEmployees();
}