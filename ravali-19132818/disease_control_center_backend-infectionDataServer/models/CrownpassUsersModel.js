var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CrownpassUsersSchema = new Schema({
	name: {type: String, required: true},
	address: {type: String, required: true},
	phone: {type: Number, required: true},
	age: {type: Number, required: true},
	gender: {type: String, required: true},
	nationalId: {type: String, required: true},

}, {timestamps: true});

module.exports = mongoose.model("crownpassUsers", CrownpassUsersSchema);