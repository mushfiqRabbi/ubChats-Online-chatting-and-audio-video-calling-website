const Inbox = require("../models/inboxModel");
const { getUserByEmail } = require("./userController");

const getInboxListWithOverView = async (email) => {
  let inboxListWithOverView = await Inbox.find({
    belongs_to: {
      $elemMatch: {
        $eq: email,
      },
    },
  }).slice("messages", -1);

  return await Promise.all(
    inboxListWithOverView.map(async (inbox) => {
      const user = await getUserByEmail(
        inbox.belongs_to.find((e) => e !== email)
      );
      return {
        inboxId: inbox._id.toHexString(),
        userEmail: user.email,
        userDisplayName: user.displayName,
        lastMessage: inbox.messages[0].message,
        lastMessageDate: inbox.messages[0].data,
      };
    })
  );
};

const getMessages = async (inboxId) => {
  const { messages } = await Inbox.findById(inboxId);
  return messages;
};

const postMessage = async ({ _id, sender, message }) => {
  const inbox = await Inbox.findById(_id);
  inbox.messages.push({
    message,
    sender,
  });
  await inbox.save();
  return inbox.messages.at(-1);
};

module.exports = { getInboxListWithOverView, getMessages, postMessage };
