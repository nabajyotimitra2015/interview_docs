/*
STREAM:
A Stream in Node.js is a way to process data piece by piece (chunks) instead of loading the entire data into memory at once.
This makes streams memory-efficient and faster for handling large files, videos, or network data.

Without Stream
Suppose you have a 2 GB file.
*/
const fs = require("fs");
const data = fs.readFileSync("largeFile.zip");
/*
What happens?
1. Entire 2 GB file is loaded into RAM.
2. Then your application processes it.
3. High memory usage.
4. Can crash if memory is insufficient.

With Stream
*/
const fs = require("fs");

const stream = fs.createReadStream("largeFile.zip");

stream.on("data", (chunk) => {
  console.log(chunk.length);
});
/*
Types of Streams
Node.js has four main types.

1. Readable Stream
Used to read data.

Examples:
 - Reading a file
 - Receiving an HTTP request body
 - Reading from a database cursor
*/
const fs = require("fs");

const readStream = fs.createReadStream("demo.txt");

readStream.on("data", (chunk) => {
  console.log(chunk.toString());
});
/*
2. Writable Stream
Used to write data.
*/
const fs = require("fs");

const writeStream = fs.createWriteStream("output.txt");

writeStream.write("Hello");
writeStream.write(" World");

writeStream.end();
/*
3. Duplex Stream
Can read and write.
Examples:
 - TCP sockets
 - WebSockets

4. Transform Stream
A special duplex stream that modifies data while passing it through.
Examples:
 - Compression (gzip)
 - Encryption
 - Decryption
*/
const fs = require("fs");
const zlib = require("zlib");

fs.createReadStream("demo.txt")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("demo.txt.gz"));
/*
The file is compressed chunk by chunk instead of loading the whole file into memory.

How pipe() works
Instead of manually reading chunks and writing them:
*/
readStream.pipe(writeStream);
