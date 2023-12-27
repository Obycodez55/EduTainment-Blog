const express = require("express");
const router = express.Router();

/**
 * POST /
 * Admin -- Login
 */
router.post("/admin/login", function (req, res) {
    res.status(200).json({message: "Routes Working, Congrats!"}); 
});






/**
 * POST /
 * Admin -- Register
 */
router.post("/admin/register", function (req, res) {
    res.status(200).json({message: "Routes Working, Congrats!"});
});





/**
 * POST /
 * User -- Login
 */

router.post("/user/login", function (req, res) {
    res.status(200).json({message: "Routes Working, Congrats!"});
});




/**
 * POST /
 * User -- Register
 */
router.post("/user/register", function (req, res) {
    res.status(200).json({message: "Routes Working, Congrats!"});
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