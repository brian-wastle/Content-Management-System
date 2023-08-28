select * from department;
select * from employee;
select * from role;

SELECT 
    E1.id as Employee_ID,
    CONCAT(E2.first_name, ' ', E2.last_name) AS Manager_Name,
    CONCAT(E1.first_name, ' ', E1.last_name) AS Employee_Name
FROM
    employee E1
        LEFT JOIN
    employee e2 ON E1.manager_id = E2.id
WHERE
    E1.manager_id IS NOT NULL
        && E1.manager_id = 1;

SELECT
E1.id as Employee_ID,
E1.manager_id,
CONCAT(E2.first_name, ' ', E2.last_name) AS Manager_Name,
CONCAT(E1.first_name, ' ', E1.last_name) AS Employee_Name
FROM employee E1
LEFT JOIN employee e2 ON E1.manager_id = E2.id
WHERE E1.manager_id IS NOT NULL;

SELECT 
CONCAT(employee.first_name , " ", employee.last_name, " -- ", department.name) as name, 
employee.id AS value 
FROM employee 
INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON role.department_id = department.id
WHERE employee.manager_id is NULL;