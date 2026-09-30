/*
Cluster:
Scale your server to handle more requests by using multiple CPU cores. Node.js distributes incoming requests among the workers.
*/
import cluster from "cluster";
import os from "os";
import express from "express";

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary Process: ${process.pid}`);
  console.log(`Starting ${numCPUs} workers...\n`);

  // Create one worker per CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart worker if it crashes
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Starting a new worker...`);
    cluster.fork();
  });
} else {
  const app = express();

  app.get("/", (req, res) => {
    res.send(`Handled by Worker PID: ${process.pid}`);
  });

  app.listen(3000, () => {
    console.log(`Worker ${process.pid} started`);
  });
}
