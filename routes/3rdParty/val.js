const PartiesController = require("../../controllers/parties");

const router = require("express").Router();

// Fetch Agents data
router.get("/agents", PartiesController.valFetchAgents)

// Fetch Agent details
router.get("/agents/:uuid", PartiesController.valFetchAgentDetail)

module.exports = router;