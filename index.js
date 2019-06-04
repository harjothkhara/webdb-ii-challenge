const express = require('express');
const helmet = require('helmet');

const server = express(); //setting up server

const zooRouter = require ('./zooRouter.js');

//middleware
server.use(helmet()); //security - hides express in postman
server.use(express.json()); //built-in: parses body into json format

// endpoints here
server.use("/api/zoos", zooRouter);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
