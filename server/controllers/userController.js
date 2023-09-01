async function getAllUsersList(admin) {
  const users = await admin.auth().listUsers(10);
  return users;
}

async function getUserByEmail(admin, email) {
  const user = await admin.auth().getUserByEmail(email);
  return user;
}
module.exports = {
  getAllUsersList,
  getUserByEmail,
};
