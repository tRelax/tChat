const mongoose = require("mongoose");

const imageSchema2 = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
        },
        data: {
            type: Buffer,
            required: true,
        },
    }
);
module.exports = imageSchema2;