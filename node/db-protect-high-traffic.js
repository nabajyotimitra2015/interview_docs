/*
I wouldn't solve it simply by adding more Node.js instances, because that can actually increase database connection pressure. I would first put rate limiting and concurrency controls at the API layer, use Redis to reduce repeated reads, configure a controlled PostgreSQL connection pool, optimize queries and indexes, and move heavy operations to an asynchronous queue such as SQS. For read-heavy workloads, I would use read replicas. On AWS, I could use RDS Proxy to manage database connections, and monitor CPU, connections, latency, locks, slow queries and I/O. The key is to control how much traffic reaches PostgreSQL rather than allowing every incoming request to directly hit the database.

1. Connection pooling — very important
I don't create a new PostgreSQL connection for every request.

import pg from "pg";

const pool = new pg.Pool({
  max: 20,
  min: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

Then:

const result = await pool.query(
  "SELECT * FROM products WHERE id = $1",
  [productId]
);

The pool limits how many connections your Node.js application can make to PostgreSQL.

Important: If you have 10 Node.js instances and max: 20, you could potentially have around 200 database connections. So pool sizing must consider the total across all instances, not just one server.

2. Redis caching
Don't hit PostgreSQL for data that doesn't change frequently.

Request
   ↓
Redis
   │
   ├── Cache HIT → Return data
   │
   └── Cache MISS
           ↓
       PostgreSQL
           ↓
       Redis SET

Example:

const cached = await redis.get(`product:${id}`);

if (cached) {
  return JSON.parse(cached);
}

const product = await pool.query(
  "SELECT * FROM products WHERE id = $1",
  [id]
);

await redis.set(
  `product:${id}`,
  JSON.stringify(product.rows[0]),
  { EX: 300 }
);

3. Rate limiting
If 100,000 users suddenly hit your API, don't allow every request to reach PostgreSQL.

For example:

100,000 requests
       ↓
Rate limiter
       ↓
20,000 allowed
       ↓
Node.js
       ↓
PostgreSQL

4. Put heavy work into a queue
Don't make the user request perform expensive database work synchronously.

For example, order processing:
I can use technologies such as SQS, RabbitMQ, or Kafka, depending on the requirement.

5. Database indexes
Make sure frequently executed queries are properly indexed.

6. Read replicas
If our application has very high read traffic, we can use PostgreSQL read replicas.

7. Protect the database with concurrency limits
Suppose PostgreSQL can safely handle only 100 concurrent expensive operations.
Don't allow thousands of Node.js requests to simultaneously execute expensive queries.

10,000 requests
       ↓
Node.js
       ↓
Concurrency control
       ↓
100 DB operations
       ↓
PostgreSQL

The remaining work can wait, be cached, or go to a queue.

8. Use timeouts
Never let database requests remain open indefinitely.

const pool = new pg.Pool({
  max: 20,
  connectionTimeoutMillis: 2000
});

At the API level, also consider request timeouts.
This prevents stuck requests from consuming resources indefinitely.

9. Circuit breaker
If PostgreSQL is already overloaded, continuously sending more requests makes the problem worse.
A circuit breaker can temporarily stop requests from reaching an unhealthy dependency.
*/
