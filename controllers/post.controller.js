import prisma from "../lib/prisma.js";

async function getPosts(req, res) {
  const query = req.query;
  console.log(query);
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: {
          contains: query.location || undefined,
          mode: "insensitive",
        },
        bedroom: Number(query.bedroom) || undefined,
        property: query.property || undefined,
        type: query.type || undefined,
        price: {
          gte: Number(query.minPrice) || 0,
          lte: Number(query.maxPrice) || 1000000,
        },
      },
    });
    console.log(posts);
    res.status(200).json(posts);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get Posts" });
  }
}

async function getPost(req, res) {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    res.status(200).json(post);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get Posts" });
  }
}

async function addPost(req, res) {
  const { postDetail: postDetail, ...body } = req.body;
  console.log(body);
  const tokenUserId = req.userId;
  let d = { ...body };
  d = d.postData;
  try {
    const newPost = await prisma.post.create({
      data: {
        ...d,
        userId: tokenUserId,
        postDetail: {
          create: postDetail,
        },
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
