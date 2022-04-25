var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AreaSchema = new Schema({
	name: {type: String, required: true},
	lat: {type: Number, required: true},
	long: {type: Number, required: true},
	population: {type: String, required: true},
	areaSqKm: {type: Number, required: true},
}, {timestamps: true});

module.exports = mongoose.model("Area", AreaSchema);