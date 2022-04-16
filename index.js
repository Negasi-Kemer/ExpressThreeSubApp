// Require express
const express = require("express");

// Create express ap
const app = express();

const http = require("http");

const port = process.env.port || 3000;

// Parse incoming request - JSON data
app.use(express.json());

// Require router
const router = require("./Developers/router");

// Use router
app.use("/api/v1/developers", router);

// Create server
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server Listening on: ${port}`);
});
