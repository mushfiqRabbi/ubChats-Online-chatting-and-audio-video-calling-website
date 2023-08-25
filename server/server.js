const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const admin = require("./firebase_admin");

const { getAllUsersList } = require("./controllers/userController");

const ioServer = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
app.use(cors());

ioServer.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

app.get("/api/users", async (req, res) => {
  const users = await getAllUsersList(admin);
  // console.log(users);
  res.json(users);
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
