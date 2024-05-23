const chatModel = require("../models/chatModel");


const createChat = async (req, res) => {
    const {firstId, secondId} = req.body;

    try {
        const chat = await chatModel.findOne({
            members: {$all: [firstId, secondId]}
        });

        if(chat) return res.status(200).json(chat);

        const newChat = new chatModel({
            members: [firstId, secondId]
        });
        const response = await newChat.save();
        res.status(200).json(response);
        console.log("SUCCESS! createChat");
    } catch (error){
        console.log(error);
        res.status(500).json(error);
    }
}

const createEmptyChat = async (req, res) => {
    const {name, ownerId} = req.body;

    try {
        const newChat = new chatModel({
            name,
            members: [ownerId]
        });
        const response = await newChat.save();
        res.status(200).json(response);
        console.log("SUCCESS! createEmptyChat");
    } catch (error){
        console.log(error);
        res.status(500).json(error);
    }
}
const findUserChats = async(req, res) => {
    const userId = req.params.userId;

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

const findChat = async(req, res) => {
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

const addNewUserToChat = async(req, res) => {
    const {userId, chatId} = req.body;

    try {
        const chat = await chatModel.findById(chatId);
        const alreadyMember = chat?.members.find(user => user === userId);
        if(alreadyMember) return res.status(500).json("Already in chat!")
        chat?.members.push(userId);
        const response = await chat?.save();
        res.status(200).json(response);
        console.log("SUCCESS! addNewUserToChat");
    } catch (error){
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {createChat, createEmptyChat, findUserChats, findChat, addNewUserToChat};


