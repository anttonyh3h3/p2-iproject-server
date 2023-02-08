const Controller = require("../controllers");

const router = require("express").Router();

// Users routing endpoints

// User register
router.post("/register", Controller.userRegister);

// User Login
router.post("/login", Controller.userLogin)

// User verify
// router.patch("/verify")

// User change email/password

module.exports = router;