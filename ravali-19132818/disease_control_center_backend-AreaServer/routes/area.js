var express = require("express");
const AreaController = require("../controllers/AreaController");

var router = express.Router();


router.post("/add-area",AreaController.addArea )
router.post("/add-sub-area",AreaController.addSubArea )
router.post("/remove-area",AreaController.removeArea )

router.post("/subArea",AreaController.getSubArea )
router.post("/markInfected",AreaController.markInfected )
router.get("/list",AreaController.getAreaList )

module.exports = router;