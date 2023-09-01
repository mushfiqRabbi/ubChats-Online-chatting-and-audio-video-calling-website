const admin = require("../firebase_admin");

async function getAllUsersList() {
  const users = await admin.auth().listUsers(10);
  return users;
}

async function getUserByEmail(email) {
  const user = await admin.auth().getUserByEmail(email);
  return user;
}
module.exports = {
  getAllUsersList,
  getUserByEmail,
};
