const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
        },
        data: {
            type: String,
            required: true,
        },
    }
);
const imageModel = mongoose.model("Images", imageSchema);
module.exports = imageModel;