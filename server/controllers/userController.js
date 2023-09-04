const admin = require("../firebase_admin");

async function getAllUsersList() {
  const users = await admin.auth().listUsers(10);
  return users;
}

async function getUserByEmail(email) {
  let user;
  try {
    user = await admin.auth().getUserByEmail(email);
  } catch (error) {
    user = null;
  } finally {
    return user;
  }
}
module.exports = {
  getAllUsersList,
  getUserByEmail,
};
