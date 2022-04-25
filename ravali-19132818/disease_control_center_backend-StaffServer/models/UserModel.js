var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	staffName: {type: String, required: false},
	staffType: {type: String, required: false},
	email: {type: String, required: false},
	password: {type: String, required: false},
	// isConfirmed: {type: Boolean, required: true, default: 0},
	// confirmOTP: {type: String, required:false},
	// otpTries: {type: Number, required:false, default: 0},
	// status: {type: Boolean, required: true, default: 1}
}, {timestamps: true});

// Virtual for user's full name
// UserSchema
// 	.virtual("fullName")
// 	.get(function () {
// 		return this.staffName;
// 	});

module.exports = mongoose.model("User", UserSchema);