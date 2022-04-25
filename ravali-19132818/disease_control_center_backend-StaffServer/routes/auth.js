var express = require("express");
const AuthController = require("../controllers/AuthController");

var router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/verify-otp", AuthController.verifyConfirm);
// router.post("/resend-verify-otp", AuthController.resendConfirmOtp);
router.post("/add-staff",AuthController.addStaff )
router.post("/remove-staff",AuthController.removeStaff )

router.get("/get-all-staff",AuthController.getStaffList )

module.exports = router;