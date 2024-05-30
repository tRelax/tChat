const express = require("express");
const {
    createChat,
    findUserChats,
    findChat,
    addNewUserToChat,
    createEmptyChat,
    removeUserFromChat
} = require("../controllers/chatController");

const router = express.Router();

router.post("/", createChat);
router.post("/newChat", createEmptyChat);
router.get("/:userId", findUserChats);
router.get("/find/:firstId/:secondId", findChat);
router.put("/addUserToChat", addNewUserToChat);
router.delete("/removeUserFromChat", removeUserFromChat);

module.exports = router;