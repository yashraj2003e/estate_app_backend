import prisma from "../lib/prisma.js";
import bcryptjs from "bcryptjs";
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

  if (id !== tokenUserId) {
    res.status(401).json({ message: "Not Authorized" });
    return;
  }

  let updatedPassword = null;
  const { password, avatar, ...inputs } = req.body;
  console.log("AVATAR => ", avatar);
  try {
    if (password) {
      updatedPassword = await bcryptjs.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    const { password: userPassword, ...rest } = updatedUser;

    res.status(200).json(rest);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to update user!" });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    res.status(401).json({ message: "Not Authorized" });
    return;
  }

  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "Successfully Deleted user !" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to delete User" });
  }
}

export { getUsers, getUser, updateUser, deleteUser };
