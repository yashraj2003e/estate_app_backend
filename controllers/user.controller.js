import prisma from "../lib/prisma.js";

async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get Users!" });
  }
}

async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get User!" });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  const tokenUserId = req.userId;
  console.log(id);
  console.log(tokenUserId);
  if (id !== tokenUserId) {
    res.status(401).json({ message: "Not Authorized" });
    return;
  }
  const body = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: body,
    });
    res.status(200).json(updatedUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to update users!" });
  }
}

async function deleteUser(req, res) {
  try {
    res.status(200).send(req.params.id);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to delete User" });
  }
}

export { getUsers, getUser, updateUser, deleteUser };
