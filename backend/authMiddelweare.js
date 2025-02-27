
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    // console.log(authHeader);
    if (!authHeader) {
      return res.status(403).json({ message: "Authorization header is missing" });
    }
  
    try {
      const decoded = jwt.verify(authHeader, process.env.JWT_PASS);
      // Attach the user ID to the request object
      req.userId = decoded.id;
      next();
    } catch (error) {
      console.error("Error in authMiddleware:", error);
      res.status(403).json({ message: "Invalid or expired token" });
    }
  };

  const authWorkerMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
  
    if (!authHeader) {
      return res.status(403).json({ message: "Authorization header is missing" });
    }
  
    try {
      const decoded = jwt.verify(authHeader, process.env.JWT_WORKER_SCRERT);
      // Attach the user ID to the request object
      req.userId = decoded.id;
      next();
    } catch (error) {
      console.error("Error in authMiddleware:", error);
      res.status(403).json({ message: "Invalid or expired token" });
    }
  }

  //testing route directly
  const cookieExtractor = (req,res,next) => {
   const token = req.cookies['token'];
    // console.log(req.cookies)
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_PASS);
      console.log(process.env.JWT_PASS);
     
      req.userId = decoded.id;
      next();
    } catch (error) {
      console.error("Error in authMiddleware:", error);
      res.status(403).json({ message: "Invalid or expired token" });
    }
  };
export { authMiddleware,authWorkerMiddleware ,cookieExtractor }