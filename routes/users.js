const Controller = require("../controllers");

const router = require("express").Router();

// Users routing endpoints

// User register
router.post("/register", Controller.userRegister);

// User Login
router.post("/login", Controller.userLogin)

// User Oauth
router.use("/oauth", require("./3rdParty/oauth"))

// User verify
// router.patch("/verify")

// User change email/password

module.exports = router;