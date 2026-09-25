// main.js
const { Worker } = require("worker_threads");

const worker = new Worker("./worker.js");

worker.postMessage({
  operation: "calculate",
  numbers: [10, 20, 30, 40],
});

worker.on("message", (result) => {
  console.log(result);
});

// worker.js
const { parentPort } = require("worker_threads");

parentPort.on("message", (data) => {
  const { operation, numbers } = data;

  if (operation === "calculate") {
    const sum = numbers.reduce((total, num) => total + num, 0);

    parentPort.postMessage({
      success: true,
      result: sum,
    });
  }
});

/*
What is Cluster in Node.js?

Node.js Cluster allows you to run multiple Node.js processes so that your application can use multiple CPU cores.
Normally, a Node.js application runs on one main process, which primarily uses one CPU core for JavaScript execution.
With the cluster module, you can create multiple worker processes. Each worker runs its own Node.js event loop and can handle requests independently.

Cluster vs Worker Threads vs PM2

| Feature                  | Cluster                    | Worker Threads                                                 | PM2                            |
| ------------------------ | -------------------------- | -------------------------------------------------------------- | ------------------------------ |
| What is it?              | Node.js module             | Node.js module                                                 | Process manager                |
| Runs multiple processes? | ✅ Yes                     | ❌                                                             | ✅ Yes                         |
| Runs multiple threads?   | ❌                         | ✅ Yes                                                         | ❌                             |
| Separate memory?         | ✅ Each process            | Mostly shared process resources; can share `SharedArrayBuffer` | ✅                             |
| Uses multiple CPU cores? | ✅                         | ✅                                                             | ✅ when using cluster mode     |
| Best for                 | Scaling HTTP servers       | CPU-heavy tasks                                                | Production process management  |
| Auto restart             | ❌ Built-in                | ❌                                                             | ✅                             |
| Load balancing           | Basic cluster distribution | ❌                                                             | ✅ Cluster mode                |
| Zero-downtime deployment | ❌                         | ❌                                                             | ✅                             |
| Production monitoring    | Limited                    | Limited                                                        | ✅                             |
| Example                  | HTTP server scaling        | PDF/image processing                                           | Running Node API in production |


*/
