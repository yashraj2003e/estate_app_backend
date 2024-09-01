import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Not Authenticated !" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      res.status(401).json({ message: "Not Authenticated !" });
    }
    req.userId = payload.id;
    next();
  });
};
