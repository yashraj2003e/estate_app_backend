import prisma from "../lib/prisma.js";

async function getChats(req, res) {
  const tokenUserId = req.userId;
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    for (const chat of chats) {
      const receiverId = chat.userIDs.find((id) => id !== tokenUserId);

      const receiver = await prisma.user.findUnique({
        where: {
          id: receiverId,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });

      chat.receiver = receiver;
    }

    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get Chats!" });
  }
}

async function getChat(req, res) {
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userIds: {
          hasSome: [tokenUserId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    await prisma.chat.update({
      where: {
        id: req.params.id,
      },
      data: {
        seenBy: {
          push: [tokenUserId],
        },
      },
    });

    res.status(200).json(chat);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get Chats!" });
  }
}

async function addChat(req, res) {
  const tokenUserId = req.userId;
  try {
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokenUserId, req.body.receiverId],
      },
    });
    res.status(200).json(newChat);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get Chats!" });
  }
}

async function readChat(req, res) {
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: {
          push: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get Chats!" });
  }
}

export { getChats, getChat, readChat, addChat };
