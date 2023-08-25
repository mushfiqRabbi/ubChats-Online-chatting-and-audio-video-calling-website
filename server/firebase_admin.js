const admin = require("firebase-admin");

const serviceAccount = require("./ub-chats-firebase-adminsdk-poj1a-7800a81a62.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
