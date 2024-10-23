const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

// const authenticateToken = require("../middlewares/authMiddleware");

router.post("/register", adminController.register);
router.post("/login", adminController.login);
router.get("/get-admin", adminController.getadmin);
router.get("/getall-admin", adminController.getalladmin);

module.exports = router;
