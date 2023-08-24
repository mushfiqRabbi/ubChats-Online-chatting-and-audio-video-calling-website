const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
// const cors = require("cors");

const app = express();
const server = http.createServer(app);
const ioServer = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );

ioServer.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
