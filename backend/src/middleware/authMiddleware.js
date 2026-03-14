// backend/src/middleware/authMiddleware.js

import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {

  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = header.split(" ")[1];

  try {

    const decoded = jwt.verify(token, "SECRET123");

    req.user = decoded;

    next();

  } catch (err) {

    return res.status(401).json({ message: "Invalid token" });

  }

};