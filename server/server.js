const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const admin = require("./firebase_admin");

const Inbox = require("./models/inboxModel");

const {
  getAllUsersList,
  getUserByEmail,
} = require("./controllers/userController");

const ioServer = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors());

const mongoose = require("mongoose");

main()
  .then(() => console.log("db connection successful!"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://mushfiqxrabbi:KAAmbNQIqlEDe9Ao@cluster01.nru9gae.mongodb.net/ub-chats"
  );

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

ioServer.on("connection", (socket) => {
  console.log("a user connected with email : ", socket.handshake.auth.email);
  socket.on("disconnect", () => {
    console.log(
      "a user disconnected with email : ",
      socket.handshake.auth.email
    );
  });

  socket.on("open-inbox", (roomId, cb) => {
    if (!roomId) {
    }
    cb("open inbox successful!");
  });

  socket.on("create-inbox-and-new-message", async (message, receiver, cb) => {
    cb("inbox creation successful!");
    const inbox = await Inbox.create({
      belongs_to: [socket.handshake.auth.email, receiver],
      messages: [
        {
          message: message,
          sender: socket.handshake.auth.email,
        },
      ],
    });
    console.log(inbox);
  });

  socket.on("new-message", async (message, inboxId, cb) => {});
});

// app.get("/api/users", async (req, res) => {
//   const users = await getAllUsersList(admin);
//   // console.log(users);
//   res.json(users);
// });

app.get("/api/inboxes", async (req, res) => {
  const inboxes = await Inbox.find({
    belongs_to: {
      $elemMatch: {
        $eq: req.query["user-email"],
      },
    },
  });
  console.log(inboxes);
  res.json(inboxes);
});

app.get("/api/inbox-details", async (req, res) => {
  console.log(req.query);
  const user = await getUserByEmail(admin, req.query["user-email"]);
  res.json({
    userEmail: user.email,
  });
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
