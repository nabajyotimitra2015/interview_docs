/*
What is a View?
A view in SQL is a virtual table created from a SQL query. It doesn't normally store its own copy of the underlying data. Views are useful for simplifying complex queries, reusing queries, and restricting access to sensitive columns or rows.

 - Virtual table
 - Usually stores query definition
 - Doesn't normally store separate data
 - Based on one or more tables
 - Can simplify complex queries

Simple example:

employees
-------------------------
id
name
department
salary

Create a view:
CREATE VIEW high_salary_employees AS
SELECT id, name, department, salary
FROM employees
WHERE salary > 50000;

Now you can query it like a table: SELECT * FROM high_salary_employees;

Why use Views?
1. Simplify complex queries - Instead of repeating a large JOIN/GROUP BY query, we can create a view and reuse it.

2. Security - You can expose only specific columns/rows, instead of exposing the sesitive columns.

Materialized View: 
A materialized view actually stores the query result, so it can be faster for expensive queries, but it needs to be refreshed when you want updated data.

CREATE MATERIALIZED VIEW sales_summary AS
SELECT department, SUM(amount)
FROM sales
GROUP BY department;

REFRESH MATERIALIZED VIEW sales_summary;
*/
