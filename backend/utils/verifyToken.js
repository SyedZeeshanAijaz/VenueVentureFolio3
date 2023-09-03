import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
   const token = req.cookies.accessToken;

   if (!token) {
      return res.status(401).json({ success: false, message: "You are not authorized!" });
   }

   // Verify the token
   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
         return res.status(401).json({ success: false, message: "Token is invalid" });
      }

      req.user = user; // Set the user object in the request
      next();
   });
};

export const verifyUser = (req, res, next) => {
   // Check if the user has been verified by the verifyToken middleware
   if (req.user.role === 'user' || req.user.role === 'admin') {
      next(); // User is authenticated as "user" or "admin," allow them to proceed
   } else {
      return res.status(401).json({ success: false, message: "You are not authenticated as a user" });
   }
};

export const verifyAdmin = (req, res, next) => {
   // Check if the user has been verified by the verifyToken middleware
   if (req.user.role === 'admin') {
      next(); // User is authenticated as "admin," allow them to proceed
   } else {
      return res.status(401).json({ success: false, message: "You are not authorized as an admin" });
   }
};
