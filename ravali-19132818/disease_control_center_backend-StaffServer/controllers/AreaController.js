const Area = require("../models/AreaModel");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// Area Schema
function AreaData(data) {
	this.id = data._id;
	this.name = data.name;
	this.lat = data.lat;
	this.long = data.long;
	this.population = data.population;
	this.areaSqKm = data.areaSqKm;
	this.createdAt = data.createdAt;
}
exports.addArea = [
	// auth,
	// body("title", "Title must not be empty.").isLength({ min: 1 }).trim(),
	// body("description", "Description must not be empty.").isLength({ min: 1 }).trim(),
	// body("isbn", "ISBN must not be empty").isLength({ min: 1 }).trim().custom((value,{req}) => {
	// 	return Book.findOne({isbn : value,user: req.user._id}).then(book => {
	// 		if (book) {
	// 			return Promise.reject("Book already exist with this ISBN no.");
	// 		}
	// 	});
	// }),
	// sanitizeBody("*").escape(),
	(req, res) => {
		try {
			console.log(req.body)
			var area = new Area(
				{
					name: req.body.name,
					lat: req.body.lat,
					long: req.body.long,
					population: req.body.population,
				});
			//Save book.
			area.save(function (err) {
				if (err) { return apiResponse.ErrorResponse(res, err); }
				let areaData = new AreaData(book);
				for (let sub in req.body.subArea) {
					let subArea = req.bod.subArea[sub]
console.log(subArea)
				}
				return apiResponse.successResponseWithData(res, "Area add Success.", areaData);
			});

		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];