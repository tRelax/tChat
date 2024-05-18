const express = require("express");
const {createChat, findUserChats, findChat, addNewUserToChat} = require("../controllers/chatController");

const router = express.Router();

router.post("/", createChat);
router.get("/:userId", findUserChats);
router.get("/find/:firstId/:secondId", findChat);
router.put("/addUserToChat/:userId/:chatId", addNewUserToChat);

module.exports = router;