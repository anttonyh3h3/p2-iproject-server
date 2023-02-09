const router = require("express").Router();

// Fetch data from Valorant API
router.use("/val", require("./3rdParty/val"))

module.exports = router;