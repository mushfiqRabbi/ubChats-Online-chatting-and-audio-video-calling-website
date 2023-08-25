async function getAllUsersList(admin) {
  const users = await admin.auth().listUsers(10);
  return users;
}

module.exports = {
  getAllUsersList,
};
