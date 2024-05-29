const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        name: String,
        imageId: String,
        members: Array,
        code: String,
    },
    {
        timestamps: true,
    }
);

const chatModel = mongoose.model("Chat", chatSchema);

module.exports = chatModel;