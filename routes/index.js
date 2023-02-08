const router = require("express").Router();

// Users routing endpoints
router.use("/users", require("./users"));

module.exports = router;
