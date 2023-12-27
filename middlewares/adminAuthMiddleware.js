const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const authLayout = "../views/layouts/auth";

module.exports = function(req, res, next){
    const token = req.cookies.admin_token;
  
    if (!token) {
      const locals = {
        title: "Admin Page",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
      };
      return res.render("auth/admin_login", { locals, layout: authLayout, invalid: false });
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.adminId = decoded.adminId;
      next();
    } catch(error){
      console.log(error);
      res.redirect("/admin");
    }
  }