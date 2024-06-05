const chatModel = require("../models/chatModel");
const uuid = require("uuid");
const {deleteImageLocally} = require("./imageController");

const createChat = async (req, res) => {
    const {firstId, secondId} = req.body;

    try {
        const chat = await chatModel.findOne({
            members: {$all: [firstId, secondId]}
        });

        if (chat) return res.status(200).json(chat);

        const newChat = new chatModel({
            members: [firstId, secondId]
        });
        const response = await newChat.save();
        res.status(200).json(response);
        console.log("SUCCESS! createChat");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const createEmptyChat = async (req, res) => {
    const {name, ownerId, imageId} = req.body;
    try {
        if (!name) return res.status(500).json("Name must be specified.");
        if (!ownerId) return res.status(500).json("No ownerId.");

        const code = uuid.v4().split("-").pop()
        const newChat = new chatModel({
            name,
            imageId,
            members: [ownerId],
            code: code,
        });
        const response = await newChat.save();
        res.status(200).json(response);
        console.log("SUCCESS! createEmptyChat");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
const findUserChats = async (req, res) => {
    const userId = req.params.userId;

    if (userId !== req.userId) return res.status(401).json("Unauthorized access");

    try {
        const chats = await chatModel.find({
            members: {$in: [userId]}
        });
        res.status(200).json(chats);
        console.log("SUCCESS! findUserChats");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const findChat = async (req, res) => {
    const {firstId, secondId} = req.params;

    try {
        const chat = await chatModel.findOne({
            members: {$all: [firstId, secondId]}
        });
        res.status(200).json(chat);
        console.log("SUCCESS! findChat");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const addNewUserToChat = async (req, res) => {
    const {userId, chatId} = req.body;

    try {
        const chat = await chatModel.findOne({code: chatId});
        if (!chat) return res.status(500).json("Invalid code")
        const alreadyMember = chat?.members.find(user => user === userId);
        if (alreadyMember) return res.status(500).json("Already in chat!")
        chat?.members.push(userId);
        const response = await chat?.save();
        res.status(200).json(response);
        console.log("SUCCESS! addNewUserToChat");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const removeUserFromChat = async (req, res) => {
    const {userId, chatId} = req.body;

    if (userId !== req.userId) return res.status(401).json("Unauthorized access");

    try {
        await chatModel.updateOne({_id: chatId}, {
            $pull: {
                members: userId,
            },
        });

        const chat = await chatModel.findById(chatId);

        if (chat && chat?.members.length === 0) {
            await deleteImageLocally(chat?.imageId);
            await chatModel.deleteOne({_id: chatId});
            console.log("[ ", chatId, " ] server deleted, no users in server");
        }

        res.status(200).json("Successfully removed from chat");
        console.log("SUCCESS! removeUserFromChat");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {createChat, createEmptyChat, findUserChats, findChat, addNewUserToChat, removeUserFromChat};


