const express = require("express");
const Auth = require("../../controllers/auth");
const { isAuth } = require("../../middleWare/authMiddleWare");
const router = express.Router();

router.get("/users", isAuth, Auth.users);
router.get("/deleteAllUsers", isAuth, Auth.deleteAllUsers);
router.post("/register", Auth.register);
router.post("/login", Auth.login);

module.exports = router;
