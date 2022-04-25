const AreaModel = require("../models/AreaModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");

/**
 * Resend Confirm otp.
 *
 * @param {string}      email
 *
 * @returns {Object}
 */
exports.addArea = [

	(req, res) => {
		try {
			var area = new AreaModel(
				{
					name: req.body.name,
					lat: req.body.lat,
					long: req.body.long,
					population: req.body.population,
					areaSqKm: req.body.areaSqKm,
				}
			);
			console.log(req.body)
			area.save(function (err) {
				if (err) { return apiResponse.ErrorResponse(res, err); }
				let userData = {
					name: req.body.name,
					lat: req.body.lat,
					long: req.body.long,
					population: req.body.population,
					areaSqKm: req.body.areaSqKm,
				};
				return apiResponse.successResponseWithData(res,"Registration Success.", userData);
			});
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}];


	exports.getStaffList = [

		(req, res) => {
			try {
			
				UserModel.find({}).then(userData => {
					if (userData) {
						console.log(userData)
								UserModel.findOneAndUpdate({}, {
									isConfirmed: 1,
									confirmOTP: null 
								}).catch(err => {
									return apiResponse.ErrorResponse(res, err);
								});
								return apiResponse.successResponseWithData(res,"list Fetched.", userData);
							}
				});
			} catch (err) {
				return apiResponse.ErrorResponse(res, err);
			}
		}];
	