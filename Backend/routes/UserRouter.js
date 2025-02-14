

const express = require("express");
const authMiddleware = require("../middleware/AuthMiddleware");
const { GetAllUsers,AddUser } = require("../controllers/UserController");
const router = express.Router();

router.get("/getallusers",authMiddleware,GetAllUsers);
router.post("/adduser",authMiddleware,AddUser);


module.exports = router;