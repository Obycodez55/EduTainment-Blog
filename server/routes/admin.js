const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Admin = require("../models/Admin");
const User = require("../models/User");
const adminAuthMiddleware = require("../../middlewares/adminAuthMiddleware");
const ensureAdminAuth = require("../../middlewares/ensureAdminAuth");
const getTags = require("../../middlewares/getTags");

const adminLayout = "../views/layouts/admin";
const authLayout = "../views/layouts/auth";

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

router.get("/login",adminAuthMiddleware , async (req, res) => {
  try {
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.log(error);
  }
});



/**
 * GET /
 * Admin --Register
 */
router.get("/register", (req, res) => {
  try {
    const locals = {
      title: "Register as a Creator || CurioCraze",
      description: "Create an account as a creator -- CurioCraze"
    };

    res.render("auth/admin_register", { locals, layout: authLayout, error: false });
  } catch (error) {
    console.log(error);
  }
});




/**
 * GET /
 * Admin Dashboard
 */

router.get("/dashboard", ensureAdminAuth, async (req, res) => {
  try {
    const locals = {
      title: "Creator || Dashboard",
      description: "Admin Dashboard to manage posts and users."
    };
    const data = await Post.find();
    res.render("admin/dashboard", { locals, data, currentRoute: "/admin/dashboard", layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});


/**
 * GET /
 * Admin -- Creators
 */

router.get("/creators", ensureAdminAuth, async (req, res) => {
  try {
    const locals = {
      title: "Admin || Creators",
      description: "Check up on fellow Creators and their work"
    };
    const data = await Admin.find();
    res.render("admin/creators", { locals, data, currentRoute: "/admin/creators", layout: adminLayout });
  } catch (error) {
    console.log(error);
  }

});

/**
 * GET /
 * Admin -- Users
 */

router.get("/users", ensureAdminAuth, async (req, res) => {
  try {
    const locals = {
      title: "Admin || Users",
      description: "View and Manage Users"
    };
    const data = await User.find();
    res.render("admin/users", { locals, data, currentRoute: "/admin/users", layout: adminLayout });
  } catch (error) {
    console.log(error);
  }

});


/**
 * GET /
 * Admin -- Create new post
 */
router.get("/add-post", ensureAdminAuth,  async (req, res) => {
  try {
    const locals = {
      title: "Admin || Create!",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    };

    const data = await Post.find();
    res.render("admin/add-post", { locals, data, currentRoute: "/admin/dashboard", layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

/**
 * POST /
 * Admin -- Create new post
 */

router.post('/add-post', ensureAdminAuth, async (req, res) => {
  try {
    try {
      const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        tags: getTags(req.body)
      });
   
  console.log(getTags(req.body));

      // await Post.create(newPost);

      // res.redirect('admin/dashboard');
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
router.get("/edit-post/:id", ensureAdminAuth, async (req, res) => {
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

router.put("/edit-post/:id", ensureAdminAuth, async (req, res) => {
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

router.delete("/delete-post/:id", ensureAdminAuth, async (req, res) => {
  try {
    let slug = req.params.id;

    await Post.findByIdAndDelete(slug);

  res.redirect("admin/dashboard");

  } catch (error) {
    console.log(error);
  }
});


/**
 * GET  /
 * Admin -- Logout
 */

router.get("/logout", (req, res) => {
  res.clearCookie("admin_token");
  res.redirect("/");
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
