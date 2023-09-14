const Inbox = require("../models/inboxModel");
const { getUserByEmail } = require("./userController");
const { getSocketByEmail } = require("./socketController");

const createInbox = async ({ sender, receiver, receiverDisplayName }) => {
  const inbox = await Inbox.create({
    belongs_to: [sender, receiver],
  });

  return {
    inboxId: inbox._id.toHexString(),
    userEmail: receiver,
    userDisplayName: receiverDisplayName,
  };
};

const getInboxListWithOverView = async (email, ioServer) => {
  let inboxListWithOverView = await Inbox.find({
    belongs_to: {
      $elemMatch: {
        $eq: email,
      },
    },
  }).slice("messages", -1);

  inboxListWithOverView = await Promise.all(
    inboxListWithOverView.map(async (inbox) => {
      const user = await getUserByEmail(
        inbox.belongs_to.find((e) => e !== email)
      );
      return {
        inboxId: inbox._id.toHexString(),
        userEmail: user.email,
        userDisplayName: user.displayName,
        lastMessage: inbox?.messages[0]?.message,
        lastMessageDate: inbox?.messages[0]?.data,
      };
    })
  );

  inboxListWithOverView = await Promise.all(
    inboxListWithOverView.map(async (inboxWithOverview) => {
      const socket = await getSocketByEmail(
        inboxWithOverview.userEmail,
        ioServer
      );
      return await {
        ...inboxWithOverview,
        status: !!socket?.connected,
      };
    })
  );

  return inboxListWithOverView;
};

const getMessages = async (inboxId) => {
  const { messages } = await Inbox.findById(inboxId);
  return messages;
};

const postMessage = async ({ _id, sender, message }) => {
  const inbox = await Inbox.findById(_id);
  inbox?.messages.push({
    message,
    sender,
  });
  await inbox?.save();
  return inbox?.messages[inbox.messages.length - 1];
};

const getReceiverEmail = async (inboxId, senderEmail) => {
  const receiverEmail = await Inbox.findById(inboxId);
  return receiverEmail.belongs_to.find((email) => email !== senderEmail);
};

module.exports = {
  getInboxListWithOverView,
  getMessages,
  postMessage,
  createInbox,
  getReceiverEmail,
};
