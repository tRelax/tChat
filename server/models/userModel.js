const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, minLength: 3, maxlength: 10, unique: true},
        password: {type: String, required: true, minLength: 3, maxlength: 1024},
        imageId: {type: String},
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

