const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuthMiddleware = require("../../middlewares/adminAuthMiddleware");
const getTags = require("../../middlewares/getTags");

const adminLayout = "../views/layouts/admin";
const authLayout = "../views/layouts/auth";
const jwtSecret = process.env.JWT_SECRET;

/**
 * GET /
 * Admin
 */
router.get("/", (req, res) => {
  res.redirect("/admin/login");
});


/**
 * GET /
 * Admin -- Login
 */

router.get("/login", async (req, res) => {
  try {
    const locals = {
      title: "Admin Page",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    };

    res.render("auth/admin_login", { locals, layout: authLayout, invalid: false });
  } catch (error) {
    console.log(error);
  }
});

/**
 * POST /
 * Admin --Check Login
 */

router.post("/", async (req, res) => {
  try {
    const locals = {
      title: "Admin Page",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    };
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.render("admin/index", { locals, layout: adminLayout, invalid: true });
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.render("admin/index", { locals, layout: adminLayout, invalid: true });
    }

    const token = jwt.sign({ adminId: admin.id }, jwtSecret);
  res.cookie("admin_token", token, { httpOnly: true });
  res.redirect("admin/dashboard");
} catch(error){
console.log(error);
res.redirect("/admin");
}
});




/**
 * GET /
 * Admin --Register
 */
router.get("/register", (req, res) => {
  try {
    const locals = {
      title: "Admin Page",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    };

    res.render("auth/admin_register", { locals, layout: authLayout, invalid: false });
  } catch (error) {
    console.log(error);
  }
});




/**
 * GET /
 * Admin Dashboard
 */

router.get("/dashboard", checkAuthMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Admin || Dashboard",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    };

    const data = await Post.find();
    res.render("admin/dashboard", { locals, data, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Admin -- Create new post
 */
router.get("/add-post", checkAuthMiddleware,  async (req, res) => {
  try {
    const locals = {
      title: "Admin || Create!",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    };

    const data = await Post.find();
    res.render("admin/add-post", { locals, data, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

/**
 * POST /
 * Admin -- Create new post
 */

router.post('/add-post', checkAuthMiddleware, async (req, res) => {
  try {
    try {
      const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        tags: getTags(req.body)
      });
   
   
    

      await Post.create(newPost);

      res.redirect('admin/dashboard');
    } catch (error) {
      console.log(error);

    }

  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Admin -- Edit post
 */
router.get("/edit-post/:id", checkAuthMiddleware, async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: "Admin Edit || "+ data.title,
      description: "Simple Blog made with NodeJs, Express, EJS and MongoDB"
    };

    res.render("admin/edit-post", { locals, data, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

/**
 * PUT /
 * Admin -- Edit post
 */

router.put("/edit-post/:id", checkAuthMiddleware, async (req, res) => {
  try {
    let slug = req.params.id;

    await Post.findByIdAndUpdate(slug, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now()
    });

  res.redirect(`admin/edit-post/${req.params.id}`);

  } catch (error) {
    console.log(error);
  }
});


/**
 * DELETE /
 * Admin -- Delete post
 */

router.delete("/delete-post/:id", checkAuthMiddleware, async (req, res) => {
  try {
    let slug = req.params.id;

    await Post.findByIdAndDelete(slug);

  res.redirect("admin/dashboard");

  } catch (error) {
    console.log(error);
  }
});



module.exports = router;

// router.get("", async (req, res) => {
//   const locals = {
//     title: "NodeJs Blog",
//     description: "Simple Blog created with NodeJs, Express & MongoDb."
//   }

//   try {
//     const data = await Post.find();
//     res.render('index', { locals, data });
//   } catch (error) {
//     console.log(error);
//   }

// });
