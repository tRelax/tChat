const express = require("express");
const {uploadImage, getImage, deleteImage} = require("../controllers/imageController");
const authToken = require("../middleware/auth");

const router = express.Router();

router.get("/:imageId", getImage);
router.post("/upload", authToken, uploadImage);
router.delete("/delete", authToken, deleteImage);

module.exports = router;