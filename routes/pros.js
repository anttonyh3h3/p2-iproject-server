const Controller = require("../controllers")

const router = require("express").Router();

// Fetch Pros data
router.get("/", Controller.fetchPros)


module.exports = router;