const Result = require("../models/ResultModel");
const InfData = require("../models/infectionData");
const apiResponse = require("../helpers/apiResponse");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// Result Schema
function ResultData(data) {
	crownpassUserId = data.crownpassUserId,
	date = data.date,
	result = data.result
}
exports.dashboard = [
	async (req, res) => {
		try {
			var data = 
				{
					totalCases :'648',
					vaccinated: '658',
					recovered: '455',
					inTreatment: '110',
					areasAffected: '33',
					centers: '18'
				}
			
				return apiResponse.successResponseWithData(res, "Data Fetched.", data);

		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];
exports.saveInfectionData	 = [
	async (req, res) => {
		try {
			var bodyData = req.body
		console.log(bodyData)
		try{
			var infData = new InfData(
				{
					area_id :bodyData.area_id,
				sub_area_id: bodyData.sub_area_id,
				positive: bodyData.positives,
				negative: bodyData.negatives,
				suspected_infection: bodyData.suspected_infection,
				in_treatment: bodyData.in_treatment,
				first_dose: bodyData.first_dose,
				second_dose:bodyData.second_dose,
				inconclusive_results:bodyData.inconclusive_results
				});
			//Save book.
			infData.save(async function (err) {
				if (err) {
					console.log(err) 
					return apiResponse.ErrorResponse(res, err);
				 }
				// let areaData = new AreaData(area);
				// console.log(areaData)
				return apiResponse.successResponseWithData(res, "data add Success.");
			});
		}
		catch(e){
			console.log(e)
		}
				
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];
exports.getInfectionData = [
	async (req, res) => {
		try {
			console.log(req.body)
			InfData.findOne({sub_area_id: req.body._id}).then((data)=>{                
				if(data !== null){
					return apiResponse.successResponseWithData(res, "Operation success", data);
				}else{
					return apiResponse.successResponseWithData(res, "Operation success, No data to return", {});
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];