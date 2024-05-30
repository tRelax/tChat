const imageModel = require("../models/imageModel");

const uploadImage = async (req, res) => {
    const {serverImage} = req.body;

    try {
        const imageData = {
            type: serverImage.type,
            data: serverImage.data,
        }

        const newImage = new imageModel(imageData);
        const response = await newImage.save();
        res.status(200).json(response);
        console.log("SUCCESS! uploadImage");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const getImage = async (req, res) => {
    const {imageId} = req.params;

    try {
        const image = await imageModel.findById(imageId);
        const imgData = image.data.split(",")[1];
        const buf = Buffer.from(imgData, 'base64');
        res.header("Content-Type", image.type).status(200).send(buf);
        console.log("SUCCESS! getImage");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {uploadImage, getImage};