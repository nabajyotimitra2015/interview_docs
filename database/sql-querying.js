/*
1. Difference between WHERE and HAVING.

The WHERE clause is used to filter rows before any groupings are made, while the HAVING clause is used to filter groups after the GROUP BY operation has been applied.

Example
Suppose we have:

employees
----------------
id
name
department
salary

WHERE — filter rows first:
SELECT department, COUNT(*)
FROM employees
WHERE salary > 50000
GROUP BY department;

HAVING — filter groups after grouping:
SELECT department, COUNT(*)
FROM employees
GROUP BY department
HAVING COUNT(*) > 10;

INTERVIEW READY - WHERE filters rows before aggregation, whereas HAVING filters the aggregated groups. For example, I use WHERE to filter employees with salary greater than ₹50,000, and HAVING to filter departments having more than 5 employees.

//------------------------------------------\\

2. Difference between GROUP BY and ORDER BY.

The GROUP BY clause is used to group rows that have the same values in specified columns into summary rows, like "find the number of employees in each department." The ORDER BY clause is used to sort the result set of a query by one or more columns.

Example
Suppose we have:

employees
----------------
id
name
department
salary

GROUP BY:
SELECT department, COUNT(*)
FROM employees
GROUP BY department;

ORDER BY:
SELECT id, name, salary
FROM employees
ORDER BY salary DESC;

INTERVIEW READY - GROUP BY is used to aggregate data based on one or more columns, while ORDER BY is used to sort the result set based on one or more columns. For example, I use GROUP BY to find the number of employees in each department, and ORDER BY to sort employees by their salary in descending order.

//------------------------------------------\\

3. Explain INNER, LEFT, RIGHT and FULL OUTER JOIN.

 - INNER JOIN returns records that have matching values in both tables. 
 - LEFT JOIN returns all records from the left table and the matched records from the right table. 
 - RIGHT JOIN returns all records from the right table and the matched records from the left table. 
 - FULL OUTER JOIN returns all records when there is a match in either left or right table.

Example
Suppose we have two tables:

employees
----------------
id
name
department_id

departments
----------------
id
department_name

INNER JOIN:
SELECT employees.name, departments.department_name
FROM employees
INNER JOIN departments ON employees.department_id = departments.id;

LEFT JOIN:
SELECT employees.name, departments.department_name
FROM employees
LEFT JOIN departments ON employees.department_id = departments.id;

RIGHT JOIN:
SELECT employees.name, departments.department_name
FROM employees
RIGHT JOIN departments ON employees.department_id = departments.id;

FULL OUTER JOIN:
SELECT employees.name, departments.department_name
FROM employees
FULL OUTER JOIN departments ON employees.department_id = departments.id;

//------------------------------------------\\

4. What is a CTE (Common Table Expression)?

A Common Table Expression (CTE) is a temporary result set that you can reference within a SELECT, INSERT, UPDATE, or DELETE statement. CTEs are defined using the WITH clause and can be used to simplify complex queries, improve readability, and enable recursive queries.

Example
Suppose we have an "employees" table and we want to find the average salary of employees in each department, and then select departments with an average salary greater than a certain threshold.

WITH DepartmentAverage AS (
    SELECT department_id, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department_id
)
SELECT d.department_name, da.avg_salary
FROM DepartmentAverage da
JOIN departments d ON da.department_id = d.id
WHERE da.avg_salary > 60000;

INTERVIEW READY - A CTE is a temporary result set that can be referenced within a query. It is defined using the WITH clause and can simplify complex queries, improve readability, and enable recursive queries. For example, I use a CTE to calculate the average salary of employees in each department and then filter departments with an average salary greater than ₹60,000.

//------------------------------------------\\

5. What are recursive CTEs?

A recursive CTE is a CTE that refers to itself. It has an anchor query that provides the starting rows and a recursive query that repeatedly finds the next level. I use recursive CTEs mainly for hierarchical data such as employee-manager relationships, categories, and folder structures.

Example: Employee hierarchy

Suppose:

employees
--------------------------------
id | name   | manager_id
1  | Rahul  | NULL
2  | Amit   | 1
3  | Priya  | 1
4  | Raj    | 2
5  | Neha   | 2

Hierarchy:

Rahul
├── Amit
│   ├── Raj
│   └── Neha
└── Priya

WITH RECURSIVE employee_tree AS (

    -- Anchor: start with Rahul
    SELECT
        id,
        name,
        manager_id,
        1 AS level
    FROM employees
    WHERE id = 1

    UNION ALL

    -- Recursive part: find employees reporting to previous level
    SELECT
        e.id,
        e.name,
        e.manager_id,
        et.level + 1
    FROM employees e
    JOIN employee_tree et
        ON e.manager_id = et.id
)

SELECT *
FROM employee_tree
ORDER BY level, id;

//------------------------------------------\\

6. Why use UNION ALL instead of UNION?

UNION ALL is generally used because recursive CTEs need to retain rows from each iteration, and it avoids the duplicate-elimination overhead of UNION. If duplicate elimination is specifically required, UNION can be used.


*/