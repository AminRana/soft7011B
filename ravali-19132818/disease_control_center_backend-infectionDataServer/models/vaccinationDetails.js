var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var VaccinationDetailsSchema = new Schema({
	crownpassUserId: {type: String, required: true},
	doseType: {type: String, required: true},
	vaccine: {type: String, required: true},
	date: {type: String, required: true},
	vaccineStaffId: {type: String, required: true},

}, {timestamps: true});

module.exports = mongoose.model("VaccinationDetails", VaccinationDetailsSchema);