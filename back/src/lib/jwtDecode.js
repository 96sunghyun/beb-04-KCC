import jwt from "jsonwebtoken";

const jwtDecode = async (req, res, next) => {
  const token = req.cookies.x_auth;
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.state = decoded;
    return next();
  } catch (error) {
    console.log(error);
  }
};

export default jwtDecode;
