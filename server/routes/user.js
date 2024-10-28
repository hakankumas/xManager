const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

const authenticateToken = require("../middlewares/authMiddleware");

router.get("/getall-user", authenticateToken, userController.getall_user);
router.get("/get-user/:id", authenticateToken, userController.get_user);
router.post("/create-user", authenticateToken, userController.create_user);
router.delete(
    "/delete-user/:_id",
    authenticateToken,
    userController.delete_user
);
router.put("/update-user", authenticateToken, userController.update_user);

module.exports = router;
