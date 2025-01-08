import prisma from "../lib/prisma.js";

async function getPosts(req, res) {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get Posts" });
  }
}

async function getPost(req, res) {
  try {
    const { id } = req.params;
    // const post = await prisma.post.fin();
    res.status(200).json(post);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get Posts" });
  }
}

async function addPost(req, res) {
  const body = req.body;
  const tokenUserId = req.userId;
  try {
    const newPost = await prisma.post.create({
      data: {
        ...body,
        userId: tokenUserId,
      },
    });
    res.status(200).json(newPost);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get Posts" });
  }
}

function updatePost(req, res) {
  try {
    res.status(200).json();
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get Posts" });
  }
}

async function deletePost(req, res) {
  const id = req.params.id;
  const tokenUserId = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not authorized !" });
    }

    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({ message: "Post Deleted !" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get Posts" });
  }
}

export { getPost, getPosts, addPost, deletePost, updatePost };
