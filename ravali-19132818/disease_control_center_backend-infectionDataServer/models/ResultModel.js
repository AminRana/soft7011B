var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ResultSchema = new Schema({
	crownpassUserId: {type: String, required: true},
	date: {type: String, required: true},
	result: {type: String, required: true},
}, {timestamps: true});

module.exports = mongoose.model("Result", ResultSchema);