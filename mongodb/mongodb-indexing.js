/*
1. What is an index in MongoDB?
An index is a data structure that improves query performance by allowing MongoDB to locate documents efficiently without scanning the entire collection.

Example:
db.users.createIndex({ email: 1 })

Then,
db.users.find({ email: "john@example.com" });
*/

/*
2. What is a compound index?
A compound index contains multiple fields and is useful when queries commonly filter, sort, or search using those fields together. The order of fields in a compound index is important.

Example:
db.orders.createIndex({
  customerId: 1,
  createdAt: -1
});

This is useful for queries such as:
db.orders.find({
  customerId: "C101"
}).sort({
  createdAt: -1
});
*/

/*
3. What is a unique index?
A unique index ensures that indexed values are unique across documents and is commonly used for fields such as email, username, or unique business identifiers.

Example:
db.users.createIndex(
  { email: 1 },
  { unique: true }
);

*/

/*
4. What is a TTL(Time To Live) index?
A TTL index automatically deletes documents after a specified period. It is useful for temporary data such as sessions, OTPs, tokens, and logs.

Example:
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }
);

Common use cases:

Sessions
 - OTP records
 - Temporary tokens
 - Logs
 - Cache-like data
 - Temporary events
*/

/*
5. What is a text index?
A text index allows MongoDB to perform text searches on string fields. A text index enables text search on string fields using the $text operator.

Example:
db.products.createIndex({
  name: "text",
  description: "text"
});

db.products.find({
  $text: {
      $search: "iphone"
  }
})
*/

/*
6. What is a multikey index?
A multikey index is an index on an array field. MongoDB automatically creates a multikey index when an indexed field contains an array.

Example:
{
  name: "John",
  skills: ["React", "Node.js", "MongoDB"]
}

Create:
db.users.createIndex({
  skills: 1
})

MongoDB automatically makes this a multikey index.
*/

/*
7. What is a sparse index?
A sparse index only contains entries for documents where the indexed field exists. It can be useful for optional fields.

Example:
db.users.createIndex(
  { phone: 1 },
  { sparse: true }
)

Suppose we have:
{
  name: "John",
  phone: "9999999999"
}
and:
{
  name: "David"
}
The second document doesn't have phone, so it isn't included in the sparse index.
*/

/*
8. How do you decide which fields should be indexed?
I design indexes based on actual query patterns, filtering selectivity, sorting requirements, compound query patterns, and read/write workload.

1. Query patterns - First I identify frequently executed queries.
Example:
db.orders.find({
  customerId: "C101"
});
If this query runs frequently:
db.orders.createIndex({
  customerId: 1
});

2. Selectivity - Fields that narrow down the result set significantly are generally better candidates.
For example:
email → highly selective
country → potentially less selective

3. Sorting - If queries frequently do: .sort({ createdAt: -1 }) then an appropriate index may help.

4. Compound queries -
If we frequently query:
{
  customerId: "C101",
  status: "PAID"
}
we may create:
{
  customerId: 1,
  status: 1
}
*/

/*
9. Explain explain()
explain() is a MongoDB method used to understand how MongoDB executes a query and whether it is using an index efficiently.

It helps us analyze query performance and identify problems such as a collection scan or an inefficient index.

3 main parameters

1. queryPlanner -
db.users.find({ email: "test@gmail.com" })
  .explain("queryPlanner")

Shows the query plan selected by MongoDB.

Use it to see:
 - Which index MongoDB plans to use
 - Whether it plans IXSCAN or COLLSCAN
 - Available/considered query plans

2. executionStats ⭐ Most useful for performance
db.users.find({ email: "test@gmail.com" })
  .explain("executionStats")

Shows the actual execution statistics along with the query plan.

Important fields:
 - nReturned - It use to get number of documents actually returned by the query.
 - totalKeysExamined - It use to get number of index entries/keys MongoDB examined while executing the query.
 - totalDocsExamined - It use to get number of actual documents MongoDB had to examine.
 - executionTimeMillis - It use to get approximate time MongoDB took to execute the operation, measured in milliseconds.

This is usually the parameter I would use when debugging a slow query.

3. allPlansExecution
db.users.find({ email: "test@gmail.com" })
  .explain("allPlansExecution")

Provides information about multiple candidate query plans considered by MongoDB and their execution. Useful when investigating why MongoDB selected a particular plan.
*/
