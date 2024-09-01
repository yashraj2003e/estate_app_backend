async function getUsers(req, res) {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get Users!" });
  }
}

async function getUser(req, res) {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get User!" });
  }
}

async function updateUser(req, res) {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to update users!" });
  }
}

async function deleteUser(req, res) {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to delete User" });
  }
}

export { getUsers, getUser, updateUser, deleteUser };
