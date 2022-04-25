var express = require("express");
var areaRouter = require("./area");

var app = express();

app.use("/area/", areaRouter);

module.exports = app;