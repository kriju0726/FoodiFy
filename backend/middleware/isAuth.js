import jwt from "jsonwebtoken"        //This file for getting/fetching token from cookies(chrome) to know about cuurent User...


const isAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Token not found" });

  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodeToken.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


export default isAuth
