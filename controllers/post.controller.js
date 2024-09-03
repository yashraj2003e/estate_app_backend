import prisma from "../lib/prisma";

async function getPosts(req, res) {
  try {
    const posts = await prisma.Post.findMany();
    res.status(200).json(posts);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get Posts" });
  }
}

async function getPost(req, res) {
  try {
    const { id } = req.params;
    const post = await prisma.Post.fin();
    res.status(200).json(post);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get Posts" });
  }
}

function addPost(req, res) {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get Posts" });
  }
}

function updatePost(req, res) {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get Posts" });
  }
}

function deletePost(req, res) {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get Posts" });
  }
}

export { getPost, getPosts, addPost, deletePost, updatePost };
