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

const {
  getInboxListWithOverView,
  getMessages,
  postMessage,
} = require("./controllers/inboxController");

const ioServer = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors());
app.use(express.json());

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

ioServer.on("connection", async (socket) => {
  const inboxIds = (
    await getInboxListWithOverView(socket.handshake.auth.email)
  ).map((inbox) => inbox.inboxId);
  socket.join(inboxIds);

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

  socket.on("disconnect", () => {});
});

// app.get("/api/users", async (req, res) => {
//   const users = await getAllUsersList(admin);
//   // console.log(users);
//   res.json(users);
// });

app.get("/api/inbox_list_with_overview/:email", async (req, res) => {
  const inboxListWithOverView = await getInboxListWithOverView(
    req.params.email
  );
  res.json(inboxListWithOverView);
});

app.get("/api/messages/:inboxId", async (req, res) => {
  const messages = await getMessages(req.params.inboxId);
  res.json(messages);
});

app.post("/api/messages/message", async (req, res) => {
  const message = await postMessage(req.body);
  const sockets = await ioServer.in(req.body._id).fetchSockets();
  if (sockets.length > 1) {
    const socket = sockets.find(
      (socket) => socket.handshake.auth.email === req.body.sender
    );
    socket.to(req.body._id).emit("new-message", message);
  } else {
    console.log("no user online at the moment.");
  }
  res.json(message);
});

// app.get("/api/inbox-details", async (req, res) => {
//   const user = await getUserByEmail(req.query["user-email"]);
//   res.json({
//     userEmail: user.email,
//   });
// });

server.listen(3000, () => {
  console.log("listening on port 3000");
});
