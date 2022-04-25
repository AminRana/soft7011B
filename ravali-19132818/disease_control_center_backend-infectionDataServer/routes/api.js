var express = require("express");
var infectionDataRouter = require("./infectionData");

var app = express();

app.use("/data/", infectionDataRouter);

module.exports = app;