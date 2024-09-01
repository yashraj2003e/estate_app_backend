import jwt from "jsonwebtoken";

export const shouldBeLoggedIn = async (req, res) => {
  console.log(req.userId);
  res.status(200).json({ message: "You are authenticated !" });
};

export const shouldBeAdmin = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Not Authenticated !" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      res.status(403).json({ message: "Token is not valid !" });
    }
    if (!payload.isAdmin) {
      res.status(403).json({ message: "Unauthorized !" });
    }
  });

  res.status(200).json({ message: "You are authenticated !" });
};
