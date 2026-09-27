/*
1. 1NF 2NF 3NF -

1NF — First Normal Form
A table is in 1NF if it contains only atomic values and each record is unique.

❌ Not 1NF:

| Student | Phone Numbers |
| ------- | ------------- |
| Rahul   | 9876, 8765    |
| Amit    | 7654, 6543    |

✅ 1NF:

| Student | Phone Number |
| ------- | ------------ |
| Rahul   | 9876         |
| Rahul   | 8765         |
| Amit    | 7654         |
| Amit    | 6543         |

2NF — Second Normal Form
A table is in 2NF if it is in 1NF and all non-key attributes are fully functional dependent on the primary key.

❌ Not 2NF:

| Student | Course | Instructor |
| ------- | ------ | ---------- |
| Rahul   | Math   | Mr. A      |
| Rahul   | Science| Mr. B      |
| Amit    | Math   | Mr. A      |

✅ 2NF:

| Student | Course |
| ------- | ------ |
| Rahul   | Math   |
| Rahul   | Science|
| Amit    | Math   |

| Course  | Instructor |
| ------- | ---------- |
| Math    | Mr. A      |
| Science | Mr. B      |

3NF — Third Normal Form
A table is in 3NF if it is in 2NF and all the attributes are functionally dependent only on the primary key.

❌ Not 3NF:

| Student | Course | Instructor | Instructor Phone |
| ------- | ------ | ---------- | ---------------- |
| Rahul   | Math   | Mr. A      | 1234             |
| Rahul   | Science| Mr. B      | 5678             |
| Amit    | Math   | Mr. A      | 1234             |

✅ 3NF:

| Student | Course |
| ------- | ------ |
| Rahul   | Math   |
| Rahul   | Science|
| Amit    | Math   |

| Course  | Instructor |
| ------- | ---------- |
| Math    | Mr. A      |
| Science | Mr. B      |

| Instructor | Instructor Phone |
| ---------- | ---------------- |
| Mr. A      | 1234             |
| Mr. B      | 5678             |

//------------------------------------------\\

2. What is a candidate key?

A candidate key is a set of one or more attributes (columns) in a database table that can uniquely identify a record (row) in that table. Each candidate key must have the following properties:
1. Uniqueness: Each value of the candidate key must be unique across all records in the table.
2. Minimality: No subset of the candidate key can uniquely identify a record. In other words, if you remove any attribute from the candidate key, it should no longer be able to uniquely identify a record.

A table can have multiple candidate keys, but only one of them can be chosen as the primary key. The other candidate keys are referred to as alternate keys.

Example:
Consider a table "Students" with the following attributes:
- StudentID (unique identifier for each student)
- Email (unique email address for each student)
- PhoneNumber (unique phone number for each student)

In this case, both "StudentID" and "Email" can serve as candidate keys because they uniquely identify each student. However, "PhoneNumber" may not be a candidate key if multiple students share the same phone number.

//------------------------------------------\\

3. Difference between CHAR and VARCHAR.

CHAR is a fixed-length string data type, while VARCHAR is a variable-length string data type.

In PostgreSQL, CHAR(n) is a fixed-length, blank-padded type, while VARCHAR(n) is variable-length with a maximum character limit. For most application data such as names and emails, I would generally use VARCHAR or TEXT. CHAR is useful when the value is genuinely fixed-length.

//------------------------------------------\\

4. ACID Properties

Atomicity - Atomicity ensures all operations in a transaction succeed or are rolled back.

Example: Bank transfer:

Account A: -₹1,000
Account B: +₹1,000

If adding ₹1,000 to B fails after deducting from A, the deduction from A is also rolled back.

BEGIN;

UPDATE accounts
SET balance = balance - 1000
WHERE id = 1;

UPDATE accounts
SET balance = balance + 1000
WHERE id = 2;

COMMIT;

If something fails:

ROLLBACK;

---------------------------------

Consistency - Consistency ensures the database remains valid according to its constraints.

For example, if we have: balance NUMERIC CHECK (balance >= 0)

A transaction cannot leave the database with an invalid negative balance if that constraint prohibits it.

---------------------------------

Isolation - Isolation controls how concurrent transactions interact with each other. Multiple transactions can execute concurrently without incorrectly interfering with each other.

Simple e-commerce example
Imagine there is only 1 product left in stock.

Product: iPhone
Stock: 1

Two customers click Buy at almost the same time:

Customer A → Transaction A
Customer B → Transaction B

Without proper isolation, both transactions might read:

Stock = 1

and both could purchase it:

Stock → -1  ❌

Conceptually:

Transaction A                    Transaction B
     │                                │
     │ Read stock = 1                 │
     │                                │
     │ Update stock → 0               │
     │                                │
     │ COMMIT                         │
     │                                │
     └───────────────┐                │
                     ↓                │
                              Sees stock = 0
                                     ↓
                              Purchase rejected

---------------------------------


Durability - Durability ensures committed changes persist even after a system failure. Once a transaction is successfully committed, the data is permanently saved and should not be lost even if the database/server crashes.

Simple example: Bank transfer

Suppose you transfer ₹1,000 to your friend.

BEGIN;

UPDATE accounts
SET balance = balance - 1000
WHERE id = 1;

UPDATE accounts
SET balance = balance + 1000
WHERE id = 2;

COMMIT;

After COMMIT the transaction is considered successful.

//------------------------------------------\\
*/