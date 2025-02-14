

const express = require("express");
const authMiddleware = require("../middleware/AuthMiddleware");
const { GetAllUsers,AddUser , GetUserDropDown , getUsersTree} = require("../controllers/UserController");
const router = express.Router();

router.get("/getallusers",authMiddleware,getUsersTree);
router.get("/getuserdropdown",authMiddleware,GetUserDropDown);
router.post("/adduser",authMiddleware,AddUser);


module.exports = router;