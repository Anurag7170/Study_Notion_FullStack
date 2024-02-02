const express = require("express");
const { createCategory, showAllCategories } = require("../controller/categoryController");
const router = express.Router();
const {auth, isStudent, isAdmin }= require("../middleware/auth")

router.route("/create").post(auth,isAdmin,createCategory);
router.route("/showAllCategories").get(showAllCategories); 



module.exports = router;