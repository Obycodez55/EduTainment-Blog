const express = require("express");
const router = express.Router();
const userAuthMiddleware = require("../../middlewares/userAuthMiddleware");
const cookieParser = require("cookie-parser");

const authLayout = "../views/layouts/auth";


/**
 * GET /
 * User
 */
router.get("/", (req, res) => {
  res.redirect("/user/login");
});


/**
 * GET /
 * USER -- Login
 */

router.get("/login", userAuthMiddleware , async (req, res) => {
    try {
      res.redirect("/home");
    } catch (error) {
      console.log(error);
    }
  });


  /**
 * GET /
 * USER -- Register
 */

router.get("/register", async (req, res) => {
    try {
      const locals = {
        title: "Admin Page",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
      };
  
      res.render("auth/user_register", { locals, layout: authLayout, error: false });
    } catch (error) {
      console.log(error);
    }
  });



  /**
 * GET  /
 * User -- Logout
 */

router.get("/logout", (req, res) => {
  res.clearCookie("user_token");
  res.redirect("/");
});

module.exports = router;