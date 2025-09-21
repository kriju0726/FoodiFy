import jwt from "jsonwebtoken"        //This file for getting/fetching token from cookies(chrome)(which was created during signUp/signIn),  
                                      //to know about curent User, by extracting their user._id...

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
