const express = require("express");
const router = express.Router();

const contentController = require("../controllers/content");

const authenticateToken = require("../middlewares/authMiddleware");

router.get(
    "/getall-content",
    authenticateToken,
    contentController.getall_content
);
router.get(
    "/get-content/:id",
    authenticateToken,
    contentController.get_content
);
router.post(
    "/create-content",
    authenticateToken,
    contentController.create_content
);
router.delete(
    "/delete-content/:_id",
    authenticateToken,
    contentController.delete_content
);
router.put(
    "/update-content/:_id",
    authenticateToken,
    contentController.update_content
);

module.exports = router;
