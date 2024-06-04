const messageModel = require("../models/messageModel");
const {findUserLocally} = require("./userController");

const createMessage = async (req, res) => {
    const {chatId, senderId, text} = req.body;

    const senderUser = await findUserLocally(senderId);
    const senderUsername = senderUser.username;
    const senderImageId = senderUser.imageId;

    const senderInfo = {senderId, senderUsername, senderImageId};

    const message = new messageModel({
        chatId, senderInfo, text
    });

    try {
        const response = await message.save();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const getMessages = async (req, res) => {
    const {chatId} = req.params;

    try {
        const messages = await messageModel.find({chatId});
        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {createMessage, getMessages};