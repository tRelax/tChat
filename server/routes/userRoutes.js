const express = require("express");
const {registerUser, loginUser, findUser, getUsers, changeUserInfo} = require("../controllers/userController");
const authToken = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", getUsers);
router.put("/changeInfo", authToken, changeUserInfo);

module.exports = router;