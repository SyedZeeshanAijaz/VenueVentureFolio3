export const verifyToken2 = (req, res, next) => {
    const token = req.cookies.accessToken;
  
    if (!token) {
      return res.status(401).json({ success: false, message: "You are not authorized!" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        console.log('Token Verification:', err, user);
      if (err) {
        return res.status(401).json({ success: false, message: "Token is invalid" });
      }
  
      req.user = user;
      next();
    });
  };
  