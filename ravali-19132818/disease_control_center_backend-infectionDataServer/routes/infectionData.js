var express = require("express");
const DataController = require("../controllers/ResultController");

var router = express.Router();


// router.post("/add-area",DataController.addArea )
router.post("/saveInfData",DataController.saveInfectionData )
router.post("/getInfData",DataController.getInfectionData )

router.get("/dashboard",DataController.dashboard )

module.exports = router;