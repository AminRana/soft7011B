var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var InfectionDataSchema = new Schema({
	area_id: {type: String, required: true},
	sub_area_id: {type: String, required: true},
	positive: {type: String, required: true},
	negative: {type: String, required: true},
	suspected_infection: {type: String, required: true},
	first_dose: {type: String, required: true},
	second_dose: {type: String, required: true},
	inconclusive_results: {type: String, required: true},
	

}, {timestamps: true});

module.exports = mongoose.model("InfectionData", InfectionDataSchema);