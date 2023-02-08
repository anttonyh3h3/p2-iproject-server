const router = require("express").Router();
const { authentication } = require("../middlewares/auth")

// Users routes endpoints
router.use("/users", require("./users"));

// 3rd party api endpoints


// Authentication
router.use(authentication)

// Coaching routes endpoints
router.use("/coaching", require("./coaching"))

module.exports = router;
