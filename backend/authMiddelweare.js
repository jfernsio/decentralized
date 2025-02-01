
import jwt from "jsonwebtoken";
const JWT_PASS = "1234567890";
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
  
    if (!authHeader) {
      return res.status(403).json({ message: "Authorization header is missing" });
    }
  
    try {
      const decoded = jwt.verify(authHeader, JWT_PASS);
      // Attach the user ID to the request object
      req.userId = decoded.id;
      next();
    } catch (error) {
      console.error("Error in authMiddleware:", error);
      res.status(403).json({ message: "Invalid or expired token" });
    }
  };
export { authMiddleware }