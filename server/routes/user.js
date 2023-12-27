const express = require("express");
const router = express.Router();

const authLayout = "../views/layouts/auth";


/**
 * GET /
 * USER -- Login
 */

router.get("/login", async (req, res) => {
    try {
      const locals = {
        title: "Admin Page",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
      };
  
      res.render("auth/user_login", { locals, layout: authLayout, invalid: false });
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
  
      res.render("auth/user_register", { locals, layout: authLayout, invalid: false });
    } catch (error) {
      console.log(error);
    }
  });



module.exports = router;