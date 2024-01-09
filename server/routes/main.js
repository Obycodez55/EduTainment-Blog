const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const ensureUserAuth = require("../../middlewares/ensureUserAuth");

/**
 * GET /
 * HOME
 */
router.get("/home", ensureUserAuth, async (req, res) => {
  try {
    const locals = {
      title: "Home  || CurioCraze",
      description: "Homepage of the CurioCraze Blog Website -- Welcome"
    };

    let perPage = 10;
    let page = req.query.page || 1;

    const userId = req.userId;
    const user = await User.findById({_id: userId});
    
    const post = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("home", {
      locals,
      post,
      user,
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

router.get("/about", ensureUserAuth, (req, res) => {
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
router.get("/contact", ensureUserAuth,  (req, res) => {
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
router.get("/post/:id", ensureUserAuth,  async (req, res) => {
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

router.get("/search/:searchTerm", ensureUserAuth, async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog made with NodeJs, Express, EJS and MongoDB"
    };

    let searchTerm = req.params.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
      $or: [
        {tags: {$regex: new RegExp(searchNoSpecialChar, "i")}},
        { title: {$regex: new RegExp(searchNoSpecialChar, "i")}},
        { body: {$regex: new RegExp(searchNoSpecialChar, "i")}},
        {description: {$regex: new RegExp(searchNoSpecialChar, "i")}},
        {image: {$regex: new RegExp(searchNoSpecialChar, "i")}}
      ]
    })
    res.render("search", {data, locals, searchTerm ,currentRoute: `/post/${searchTerm}` });

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
