/*
Stored Procedure:
A stored procedure is reusable database-side logic stored in PostgreSQL. It can contain multiple SQL statements and procedural logic.

Procedures are created using CREATE PROCEDURE and called using CALL.

Simple example -
Suppose we want to transfer money between two accounts.

CREATE OR REPLACE PROCEDURE transfer_money(
    from_account INT,
    to_account INT,
    amount NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE accounts
    SET balance = balance - amount
    WHERE id = from_account;

    UPDATE accounts
    SET balance = balance + amount
    WHERE id = to_account;
END;
$$;

Call it: CALL transfer_money(101, 102, 1000);

Usage of Stored Procedure
 - Reuse business/database logic
 - Reduce repeated SQL
 - Perform multiple database operations together
 - Can improve security by controlling what database operations users can execute
 - Useful for complex database-side operations

Function in PostgreSQL:
A PostgreSQL function is reusable database-side logic that can accept parameters and return a value or a set of rows. Functions can be called from SQL expressions, such as SELECT, and are useful for encapsulating calculations, queries, and reusable business logic.

Function that reads from a table -

CREATE OR REPLACE FUNCTION get_employee_salary(
    employee_id INT
)
RETURNS NUMERIC
LANGUAGE plpgsql
AS $$
DECLARE
    emp_salary NUMERIC;
BEGIN
    SELECT salary
    INTO emp_salary
    FROM employees
    WHERE id = employee_id;

    RETURN emp_salary;
END;
$$;

Call it: SELECT get_employee_salary(101);

Function vs Stored Procedure -

| Function                             | Procedure                                           |
| ------------------------------------ | --------------------------------------------------- |
| Created with `CREATE FUNCTION`       | Created with `CREATE PROCEDURE`                     |
| Called with `SELECT`/SQL expressions | Called with `CALL`                                  |
| Can return a value or rows           | Doesn't return a value in the same way              |
| Can be used inside SQL queries       | Used primarily to perform operations                |
| Transaction control is restricted    | Can use transaction control in appropriate contexts |

*/
