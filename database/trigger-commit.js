/*
TRIGGER IN DATABASE:
A database trigger is an automatically executed database object that fires when events such as INSERT, UPDATE, or DELETE occur on a table or view. Triggers usually execute a trigger function and can run BEFORE, AFTER, or INSTEAD OF the operation.

Simple Example -
Suppose we have an employees table:

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    salary NUMERIC,
    updated_at TIMESTAMP
);

We want updated_at to automatically change whenever an employee record is updated.

First, create the trigger function:

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

Then create the trigger:

CREATE TRIGGER employee_update_trigger
BEFORE UPDATE ON employees
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

Now:
UPDATE employees
SET salary = 80000
WHERE id = 1;

The trigger automatically sets: updated_at = current timestamp

COMMIT:
COMMIT is a SQL command used to permanently save the changes made during a transaction to the database.

It is mainly used with INSERT, UPDATE, and DELETE.

Simple Example -
BEGIN;

UPDATE employees
SET salary = salary + 5000
WHERE employee_id = 101;

COMMIT;

After COMMIT, the salary change is permanently saved.
*/
