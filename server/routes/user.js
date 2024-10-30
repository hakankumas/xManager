const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

const authenticateToken = require("../middlewares/authMiddleware");

router.get("/getall-user", userController.getall_user);
router.get("/get-user/:id", userController.get_user);
router.post("/create-user", userController.create_user);
router.delete("/delete-user/:_id", userController.delete_user);
router.put("/update-user/:_id", userController.update_user);

module.exports = router;
