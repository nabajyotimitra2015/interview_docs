/*
1. Check blocking/synchronous code
Avoid CPU-heavy or synchronous operations inside the request path.
❌
*/
app.get("/report", (req, res) => {
  const data = fs.readFileSync("large-file.json");
  const result = heavyCalculation(data);

  res.json(result);
});
/*
This blocks the Node.js event loop.
✅
*/
app.get("/report", async (req, res) => {
  const data = await fs.promises.readFile("large-file.json");
  const result = await heavyCalculation(data);

  res.json(result);
});
/*
2. Check database queries
Avoid getting all of the fields from a database query. Instead, select only the fields you need.
❌
*/
app.get("/users", (req, res) => {
  const users = db.query("SELECT * FROM users"); // Synchronous query
  res.json(users);
});
/*
✅
*/
app.get("/users", async (req, res) => {
  const users = await db.query("SELECT id, name FROM users");
  res.json(users);
});
/*
4. Don't create database connections per request
Avoid creating a new database connection for each request. Instead, use a connection pool or a singleton pattern to reuse existing connections.
❌
*/
app.get("/data", (req, res) => {
  const connection = db.createConnection();
  const data = connection.query("SELECT * FROM data");
  connection.close();
  res.json(data);
});
/*
✅
*/
const pool = pgsql.createPool({
  host: "localhost",
  user: "user",
  password: "password",
  database: "mydb",
  max: 10, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
});

app.get("/users", async (req, res) => {
  const [users] = await pool.query("SELECT id, name FROM users LIMIT 100");
  res.json(users);
});
/*
5. Check unnecessary sequential API calls

❌
*/
var user = await getUser(id); // use const
var orders = await getOrders(id); // use const
var profile = await getProfile(id); // use const
/*
✅
*/
const [user, orders, profile] = await Promise.all([
  getUser(id),
  getOrders(id),
  getProfile(id),
]);
/*
6. Add caching
If the same expensive operation happens repeatedly:
Use caching to store the result of the operation and return it for subsequent requests.
*/
const cache = new Map();

app.get("/expensive-operation", async (req, res) => {
  const cacheKey = "expensive-operation-result";
  if (cache.has(cacheKey)) {
    return res.json(cache.get(cacheKey));
  }

  const result = await expensiveOperation();
  cache.set(cacheKey, result);
  res.json(result);
});
/*
7. Check for memory leaks
Avoid retaining references to objects that are no longer needed, as this can lead to memory leaks and increased memory usage over time.

8. Add timeouts
Don't allow an external service to hang your request indefinitely.
*/
const response = await axios.get(url, {
  timeout: 5000,
});
/*
Otherwise, under high traffic, many Node.js requests can remain waiting for an unhealthy downstream service.

9. Add proper error handling
We shouldn't allow rejected promises or unexpected exceptions to destabilize the process.

And centralized error handling:
*/
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal server error",
  });
});

/*
Handling Load Balance -
After optimizing the Node.js application code, I would focus on infrastructure-level scaling. First, I would put a Load Balancer such as AWS Application Load Balancer in front of multiple stateless Node.js instances so that incoming traffic is distributed across healthy instances.

Cache Implementation -
Next, I would introduce Redis caching for frequently accessed data to reduce repeated database queries and improve response time.

Protect/Scale DB -
Then I would protect and scale the database by using connection pooling, query optimization, proper indexing, pagination, and read replicas for read-heavy workloads.

Implementation of Asynchronous Queue -
If the application performs heavy or time-consuming operations such as sending emails, generating reports, processing payments, or creating PDFs, I would move those operations to an asynchronous queue such as Amazon SQS and process them using background workers like Lambda or ECS.

Auto Scale -
Finally, I would configure AWS Auto Scaling to automatically increase or decrease the number of Node.js instances based on metrics such as CPU utilization, request count, latency, or queue depth. This allows the application to handle sudden traffic spikes while keeping the system responsive and preventing individual components such as the database from becoming overloaded.

*/
