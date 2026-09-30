/*
BACKPRESSURE:
Backpressure is a mechanism in Node.js streams that prevents the producer (Readable stream) from sending data faster than the consumer (Writable stream) can process it.
Without backpressure, data would accumulate in memory, potentially causing high memory usage or crashes.

Example
Suppose you're copying a 5 GB file.
*/
const fs = require("fs");

const readStream = fs.createReadStream("movie.mp4");
const writeStream = fs.createWriteStream("copy.mp4");

readStream.pipe(writeStream);
/*
Without Backpressure
Imagine the readable stream produces:

64 KB
64 KB
64 KB
64 KB
64 KB
...

But the writable stream can only write:

64 KB every second

The unread chunks pile up in memory:

Memory

Chunk 1
Chunk 2
Chunk 3
Chunk 4
Chunk 5
Chunk 6
...

Memory usage keeps increasing.

Readable
   │
   ▼
Chunk
   │
   ▼
Writable

Writable busy?
       │
     Yes
       │
Pause Readable
       │
Writable finishes
       │
Resume Readable
*/
