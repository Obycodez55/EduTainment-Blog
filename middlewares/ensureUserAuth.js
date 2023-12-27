const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const authLayout = "../views/layouts/auth";

module.exports = function(req, res, next){
    const token = req.cookies.user_token;
  
    if (!token) {
      return res.redirect("/user/login");
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.userId = decoded.userId;
      next();
    } catch(error){
      console.log(error);
      res.redirect("/");
    }
  }