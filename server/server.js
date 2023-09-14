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
  createInbox,
  getInboxListWithOverView,
  getMessages,
  postMessage,
  getReceiverEmail,
} = require("./controllers/inboxController");

const { getSocketByEmail } = require("./controllers/socketController");

const ioServer = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
if (port !== 3000) {
  app.use(express.static("public"));
}

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
    await getInboxListWithOverView(socket.handshake.auth.email, ioServer)
  ).map((inbox) => inbox.inboxId);
  socket.join(inboxIds);
  socket.to(inboxIds).emit("user-online", socket.handshake.auth.email);

  socket.on("user-typing", async (inboxId, senderEmail) => {
    socket.to(inboxId).emit("user-typing", inboxId);
  });

  socket.on("user-not-typing", async (inboxId, senderEmail) => {
    socket.to(inboxId).emit("user-not-typing", inboxId);
  });

  socket.on("disconnect", () => {
    socket.to(inboxIds).emit("user-offline", socket.handshake.auth.email);
    socket.leave(inboxIds);
  });
});

app.get("/api/inbox_list_with_overview/:email", async (req, res) => {
  const inboxListWithOverView = await getInboxListWithOverView(
    req.params.email,
    ioServer
  );
  res.json(inboxListWithOverView);
});

app.post("/api/inboxes/inbox", async (req, res) => {
  const inboxWithOverview = await createInbox(req.body);
  const senderSocket = await getSocketByEmail(req.body.sender, ioServer);
  try {
    senderSocket.join(inboxWithOverview.inboxId);
  } catch (e) {
    console.log(e.message);
  }
  res.json(inboxWithOverview);
});

app.get("/api/messages/:inboxId", async (req, res) => {
  const messages = await getMessages(req.params.inboxId);
  res.json(messages);
});

app.post("/api/messages/message", async (req, res) => {
  const message = await postMessage(req.body);
  const receiverEmail = await getReceiverEmail(req.body._id, req.body.sender);
  const senderSocket = await getSocketByEmail(req.body.sender, ioServer);
  const receiverSocket = await getSocketByEmail(receiverEmail, ioServer);
  let sockets = await ioServer.in(req.body._id).fetchSockets();
  if (sockets.length < 1) {
    senderSocket.join(req.body._id);
    if (receiverSocket) {
      receiverSocket.join(req.body._id);
    }
  } else if (sockets.length === 1) {
    if (receiverSocket) {
      receiverSocket.join(req.body._id);
    }
  }
  senderSocket.to(req.body._id).emit("new-message", message);
  res.json(message);
});

app.get("/api/users/non_connected_users/:email", async (req, res) => {
  const user = await getUserByEmail(req.params.email);
  if (user) {
    res.json([
      {
        userEmail: user.email,
        userDisplayName: user.displayName,
      },
    ]);
  } else {
    res.json([]);
  }
});

// app.get("/api/inbox-details", async (req, res) => {
//   const user = await getUserByEmail(req.query["user-email"]);
//   res.json({
//     userEmail: user.email,
//   });
// });

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
