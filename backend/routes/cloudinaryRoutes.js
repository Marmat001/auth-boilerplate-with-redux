const express = require("express");
const router = express.Router();


const {
  authenticationCheck,
  adminCheck,
} = require('../middlewares/authMiddleware')

const { upload, remove } = require("../controllers/cloudinaryControllers");

router.post("/upload-images", authenticationCheck, adminCheck, upload);
router.post("/remove-image", authenticationCheck, adminCheck, remove);

module.exports = router;
