const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authLayout = "../views/layouts/auth";

const jwtSecret = process.env.JWT_SECRET;

/**
 * POST /
 * Admin -- Login
 */
router.post("/admin/login", async (req, res) => {
  try {
    const locals = {
      title: "Creator -- Login || CurioCraze",
      description: "Login Authentication for Creators | CurioCraze"
    };
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.render("auth/admin_login", {
        locals,
        layout: authLayout,
        invalid: true
      });
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.render("auth/admin_login", {
        locals,
        layout: authLayout,
        invalid: true
      });
    }

    const token = jwt.sign({ adminId: admin.id }, jwtSecret);
    res.cookie("admin_token", token, { httpOnly: true });
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
    res.redirect("/admin");
  }
});

/**
 * POST /
 * Admin -- Register
 */
router.post("/admin/register", async (req, res) => {
  try {
    const { firstname, lastname, email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const creator = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: hashedPassword,
        no_of_Posts: 0
      };
      const admin = await Admin.create(creator);
      console.log(admin);
      const token = jwt.sign({ adminId: admin.id }, jwtSecret);
      res.cookie("admin_token", token, { httpOnly: true });
      res.redirect("/admin/dashboard");
    } catch (error) {
      const locals = {
        title: "Admin Page",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
      };

      //         res.status(409).json({message: "User Already in use"});
      //       }
      //       res.status(500).json({message: "Internal server error"});
      //     }

      if (error.code === 11000) {
        res.status(409);
        res.render("auth/admin_register", {
          locals,
          layout: authLayout,
          error: true,
          errorMessage: "Account already exists"
        });
      } else {
        res.status(500);
        res.render("auth/admin_register", {
          locals,
          layout: authLayout,
          error: true,
          errorMessage: "Internal server error, Try again!"
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.redirect("/admin/register");
  }
});

/**
 * POST /
 * User -- Login
 */

router.post("/user/login", async (req, res) => {
  try {
    const locals = {
      title: "Login || CurioCraze",
      description: "Login Authentication for users | CurioCraze"
    };
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.render("auth/user_login", {
        locals,
        layout: authLayout,
        invalid: true
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.render("auth/user_login", {
        locals,
        layout: authLayout,
        invalid: true
      });
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret);
    res.cookie("user_token", token, { httpOnly: true });
    await user.updateOne({lastLogin: Date.now()});
    res.redirect("/home");
  } catch (error) {
    console.log(error);
    res.redirect("/user");
  }
});

/**
 * POST /
 * User -- Register
 */
router.post("/user/register", async (req, res) => {
  try {
    const { firstname, lastname, email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const newUser = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: hashedPassword
      };
      await User.create(newUser);
      const user = await User.findOne({ username });
      const token = jwt.sign({ userId: user.id }, jwtSecret);
      res.cookie("user_token", token, { httpOnly: true });
      res.redirect("/home");
    } catch (error) {
      const locals = {
        title: "Admin Page",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
      };

      //         res.status(409).json({message: "User Already in use"});
      //       }
      //       res.status(500).json({message: "Internal server error"});
      //     }

      if (error.code === 11000) {
        res.status(409);
        res.render("auth/user_register", {
          locals,
          layout: authLayout,
          error: true,
          errorMessage: "Account already exists"
        });
      } else {
        res.status(500);
        res.render("auth/user_register", {
          locals,
          layout: authLayout,
          error: true,
          errorMessage: "Internal server error, Try again!"
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.redirect("/user/register");
  }
});

module.exports = router;

/**
 * POST /
 * Admin --Register
 */

// router.post("/register", async (req, res) => {

//   try {

//     const {username, password} = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10)

//     try {
//       // const admin = await Admin.create({username, password:hashedPassword});
//       res.status(201).json({message: "User created successfully", admin})
//       console.log(admin);
//     } catch (error) {
//       if (error.code === 11000){
//         res.status(409).json({message: "User Already in use"});
//       }
//       res.status(500).json({message: "Internal server error"});
//     }

//   } catch (error) {
//     console.log(error);
//   }

// });
