const Area = require("../models/AreaModel");
const SubArea = require("../models/SubAreaModel");
const apiResponse = require("../helpers/apiResponse");
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
	async (req, res) => {
		try {
			console.log(req.body)
			var area = new Area(
				{
					name: req.body.areaName,
					lat: req.body.latitude,
					long: req.body.longitude,
					population: req.body.population,
					areaSqKm: req.body.area,
				});
			//Save book.
			area.save(async function (err) {
				if (err) { return apiResponse.ErrorResponse(res, err); }
				let areaData = new AreaData(area);
				console.log(areaData)
				return apiResponse.successResponseWithData(res, "Area add Success.", areaData);
			});

		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

exports.addSubArea = [
	async (req, res) => {
		try {
			console.log(req.body)
			let areaId = req.body.areaId
			for (let sub in req.body.subAreas) {
				let oneSubArea = req.body.subAreas[sub]
				console.log(oneSubArea)
				var subArea = new SubArea(
					{
						areaId: areaId,
						name: oneSubArea.subAreaName,
						lat: oneSubArea.subLatitude,
						long: oneSubArea.subLongitude,
						population: oneSubArea.subPopulation,
						areaSqKm: oneSubArea.sqkm,
						infected: false
					});
				console.log('subArea', subArea)
				subArea.save(async function (err) {
					if (err) { return apiResponse.ErrorResponse(res, err); }
				});

			}
			return apiResponse.successResponseWithData(res, "Sub Area add Success.");

		} catch (err) {
			//throw error in json response with status 500. 
			console.log(err)
			return apiResponse.ErrorResponse(res, err);
		}
	}
];
exports.getAreaList = [
	async (req, res) => {
		try {

			Area.find({}).then(Data => {
				if (Data) {
					console.log(Data)
					return apiResponse.successResponseWithData(res, "list Fetched.", Data);
				}
			});

		} catch (err) {
			//throw error in json response with status 500. 
			console.log(err)
			return apiResponse.ErrorResponse(res, err);
		}
	}
];
exports.getSubArea = [
	async (req, res) => {
		try {
			console.log(req.body)
			SubArea.find({ areaId: req.body._id }).then(Data => {
				if (Data) {
					console.log(Data)
					return apiResponse.successResponseWithData(res, "list Fetched.", Data);
				}
			});

		} catch (err) {
			//throw error in json response with status 500. 
			console.log(err)
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

exports.markInfected = [
	async (req, res) => {
		try {
			console.log('body', req.body)
			var query = { _id: req.body.subArea._id };
			console.log(query)

			// var val = SubArea.findOneAndUpdate(query, {
			// 	infected: req.body.infection
			// })
			SubArea.findOneAndUpdate(query, {
				infected: true
			}).catch(err => {
				return apiResponse.ErrorResponse(res, err);
			});
			// var val = SubArea.findOne(query)
			return apiResponse.successResponse(res, "Marked.");

		} catch (err) {
			//throw error in json response with status 500. 
			console.log(err)
			return apiResponse.ErrorResponse(res, err);
		}
	}
];
exports.markUnInfected = [
	async () => {
		try {
			console.log('body', req.body)
			var query = { infected: true };
			console.log(query)

			var val = SubArea.find(query)
			console.log(val)
			// SubArea.findOneAndUpdate(query, {
			// 	infected: false
			// }).catch(err => {
			// 	return apiResponse.ErrorResponse(res, err);
			// });
			// var val = SubArea.findOne(query)
			return true;

		} catch (err) {
			//throw error in json response with status 500. 
			console.log(err)
			return false;
		}
	}
];
exports.removeArea = [
	function (req, res) {
		console.log(req.body)
		var id = req.body.area_id
		try {

			SubArea.find({ areaId: id }).then(Data => {
				if (Data) {
					console.log(Data)
					for (let i = 0; i < Data.length; i++) {
						let one_id = Data[i]._id
						SubArea.findByIdAndRemove(one_id, function (err) {
							if (err) {
							console.log(err)
							} 
						});
					}
				}
			});


			Area.findById(id, function (err, foundUser) {
				if(foundUser === null){
					return apiResponse.notFoundResponse(res,"Area does not exists with this id");
				}else{

						//delete user.
						Area.findByIdAndRemove(id,function (err) {
							if (err) { 
								return apiResponse.ErrorResponse(res, err); 
							}else{
								return apiResponse.successResponse(res,"Area delete Success.");
							}
						});
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			console.log(err)
			return apiResponse.ErrorResponse(res, err);
		}
	}
];