const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(404).json({ message: "Token not found!" });

  if (!process.env.SECRET)
    return res.status(404).json({ message: "Secret not found!" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET);

    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = isAuthenticated;
