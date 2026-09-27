/*
A. How would you find the second-highest salary?

1. Using DENSE_RANK() — recommended

SELECT salary
FROM (
    SELECT
        salary,
        DENSE_RANK() OVER (ORDER BY salary DESC) AS rank
    FROM employees
) t
WHERE rank = 2;

2. Using MAX() with a subquery

SELECT MAX(salary) AS second_highest_salary
FROM employees
WHERE salary < (
    SELECT MAX(salary)
    FROM employees
);

3. Using OFFSET

SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
OFFSET 1
LIMIT 1;

//------------------------------------------\\

B. How would you find duplicate records?

1. Find duplicates based on one column

Suppose we have:

employees
----------------
id
name
email
salary

To find duplicate emails:

SELECT email, COUNT(*) AS count
FROM employees
GROUP BY email
HAVING COUNT(*) > 1;

2. Find complete duplicate records

If a duplicate means the combination of name, email, and salary is repeated:

SELECT
    name,
    email,
    salary,
    COUNT(*) AS count
FROM employees
GROUP BY name, email, salary
HAVING COUNT(*) > 1;

3. Find the actual duplicate rows

If we want the full rows, we can use:

SELECT *
FROM employees
WHERE email IN (
    SELECT email
    FROM employees
    GROUP BY email
    HAVING COUNT(*) > 1
);

4. Using ROW_NUMBER() — useful for identifying which rows to keep/delete

SELECT *
FROM (
    SELECT
        *,
        ROW_NUMBER() OVER (
            PARTITION BY email
            ORDER BY id
        ) AS rn
    FROM employees
) t
WHERE rn > 1;

//------------------------------------------\\
*/