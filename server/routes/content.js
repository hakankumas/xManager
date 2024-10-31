const express = require("express");
const router = express.Router();

const contentController = require("../controllers/content");

const authenticateToken = require("../middlewares/authMiddleware");

router.get("/getall-content", contentController.getall_content);
router.get("/get-content/:id", contentController.get_content);
router.post("/create-content", contentController.create_content);
router.delete("/delete-content/:_id", contentController.delete_content);
router.put("/update-content/:_id", contentController.update_content);

module.exports = router;
