var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var isolationDataSchema = new Schema({
	crownpassUserId: {type: String, required: true},
	startDate: {type: String, required: true},
	endDate: {type: String, required: true},

}, {timestamps: true});

module.exports = mongoose.model("IsolationData", isolationDataSchema);