const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

/**
 * GET /
 * HOME
 */
router.get("/home", async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog made with NodeJs, Express, EJS and MongoDB"
    };

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("home", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: "/"
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * ABOUT
 */

router.get("/about", (req, res) => {
  const locals = {
    title: "NodeJs Blog | About",
    description:
      "Learn about the Simple Blog made with NodeJs, Express, EJS and MongoDB"
  };
  res.render("about", {locals, currentRoute: "/about"});
});

/**
 * GET /
 * CONTACT
 */
router.get("/contact", (req, res) => {
  const locals = {
    title: "NodeJs Blog | Contact",
    description:
      "Learn about the Simple Blog made with NodeJs, Express, EJS and MongoDB"
  };
  res.render("contact", {locals, currentRoute: "/contact"});
});




/**
 * GET /
 * Post : ID
 */
router.get("/post/:id", async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "Simple Blog made with NodeJs, Express, EJS and MongoDB"

    };

    res.render("post", { locals, data, currentRoute: `/post/${slug}` });
  } catch (error) {
    console.log(error);
  }
});

/**
 * POST /
 * Post : Search term
 */

router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog made with NodeJs, Express, EJS and MongoDB"
    };

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
      $or: [
        { title: {$regex: new RegExp(searchNoSpecialChar, "i")}},
        { body: {$regex: new RegExp(searchNoSpecialChar, "i")}}
      ]
    })
    res.render("search", {data, locals });

  } catch (error) {
    console.log(error);
  }
});

/**
 * GET  /
 * Admin -- Logout
 */

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});


module.exports = router;
