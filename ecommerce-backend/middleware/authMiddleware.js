import jwt from "jsonwebtoken";

export const authMiddleware = (
  req,
  res,
  next
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided"});}
    // console.log("AUTH HEADER:", req.headers.authorization);
    const token =
      authHeader.split(" ")[1];

    //   console.log("TOKEN:", token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
// console.log("DECODED:", decoded);

    req.user = decoded;

    next();

  } catch (error) {
    // console.log("JWT ERROR:", error.message);
    return res.status(401).json({
      message: "Invalid token"
    });
  }
};