/*
1. fork()

fork() is essentially designed to start another Node.js process.
*/
import { fork } from "child_process";

const child = fork("./worker.js");

child.send({ task: "generateReport" });

child.on("message", (message) => {
  console.log(message);
});

// worker.js:

process.on("message", (message) => {
  console.log("Task:", message);

  process.send({
    status: "completed",
  });
});

/*
The important feature is IPC (Inter-Process Communication):

Parent Node.js
      |
      | process.send()
      ↓
Child Node.js
      |
      | process.send()
      ↓
Parent Node.js

Use fork() when you want to create another Node.js worker process.
*/

/*
2. spawn()

spawn() starts an external command/program. It should be -

Python
Java
FFmpeg
Git
Linux commands
Other executables
*/
import { spawn } from "child_process";

const child_spawn = spawn("python", ["script.py"]);

child_spawn.stdout.on("data", (data) => {
  console.log(data.toString());
});

child_spawn.stderr.on("data", (data) => {
  console.error(data.toString());
});
