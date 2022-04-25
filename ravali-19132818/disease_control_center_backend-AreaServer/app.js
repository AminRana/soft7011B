var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");
var apiResponse = require("./helpers/apiResponse");
var cors = require("cors");
const cron = require('node-cron');

// DB connection
// var MONGODB_URL = process.env.MONGODB_URL;
// var MONGODB_URL = 'mongodb://127.0.0.1:27017/rest-api-nodejs-mongodb-test'
var AREA_DB = 'mongodb://127.0.0.1:27017/area-database'
var mongoose = require("mongoose");
const { Console } = require("console");

mongoose.connect(AREA_DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	//don't show the log when it is test
	if (process.env.NODE_ENV !== "test") {
		console.log("Connected to %s", AREA_DB);
		console.log("App is running ... \n");
		console.log("Press CTRL + C to stop the process. \n");
	}
})
	.catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});
var db = mongoose.connection;

var app = express();

//don't show the log when it is test
if (process.env.NODE_ENV !== "test") {
	app.use(logger("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use("/", indexRouter);
app.use("/api/", apiRouter);

// throw 404 if URL not found
app.all("*", function (req, res) {
	return apiResponse.notFoundResponse(res, "Page not found");
});

app.use((err, req, res) => {
	if (err.name == "UnauthorizedError") {
		return apiResponse.unauthorizedResponse(res, err.message);
	}
});
cron.schedule('*/30 * * * *', () => {
	console.log('chron invoked! Setting infected areas back to not infected')
	const SubArea = require("./models/SubAreaModel");
	var query = { infected: true };
	SubArea.find(query).then(areas => {
		for (let i = 0; i < areas.length; i++) {
			let oneArea = areas[i]
			var inQuery = { _id: oneArea._id }
			SubArea.findOneAndUpdate(inQuery, {
				infected: false
			}).catch(err => {
				return console.log(err);
			});
		}
	}).catch(err => {
		return console.log(err);
	});
});
module.exports = app;
