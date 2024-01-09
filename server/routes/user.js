const express = require("express");
const router = express.Router();
const userAuthMiddleware = require("../../middlewares/userAuthMiddleware");
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
        title: "Register || CurioCraze Edutainment Blog",
        description: "Register -- Authentication page for new members of CurioCraze"
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