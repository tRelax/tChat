const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    chatId: String,
    senderInfo: {
        senderId: String,
        senderUsername: String,
    },
    text: String,
},
{
    timestamps: true,
})

const messageModel = mongoose.model("Message", messageSchema);

module.exports = messageModel;