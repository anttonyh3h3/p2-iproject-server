const Controller = require("../controllers");

const router = require("express").Router();

// Users routing endpoints
router.post("/register", Controller.userRegister);

router.post("/login", Controller.userLogin)

module.exports = router;