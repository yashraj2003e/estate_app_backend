import bcrpyt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
export const register = async (req, res) => {
  // db operation
  const { username, email, password } = req.body;
  // Hash Password

  try {
    const hashedPassword = await bcrpyt.hash(password, 10);

    // Create a new User
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);
    res.status(201).json({ message: "User Created Successfully !" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to create User !" });
  }
};

export const login = async (req, res) => {
  // db operations
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials !" });
    }

    // Check if the password is correct

    const isPasswordValid = await bcrpyt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials !" });
    }

    // Generate cookie token and send to the user

    const age = 1000 * 60 * 60 * 24 * 7;

    const { password: userPassword, ...userInfo } = user;

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: true,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    console.log(userInfo);

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
        // secure: true,
      })
      .status(200)
      .json(userInfo);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to login !" });
  }
};

export const logout = (req, res) => {
  //db operations
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logout Successfuly !" });
};
