const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

// const authenticateToken = require("../middlewares/authMiddleware");

router.post("/login", adminController.login);
router.post("/create-admin", adminController.create_admin);
router.delete("/delete-admin/:_id", adminController.delete_admin);
router.get("/get-admin", adminController.get_admin);
router.get("/getall-admin", adminController.getall_admin);

module.exports = router;
