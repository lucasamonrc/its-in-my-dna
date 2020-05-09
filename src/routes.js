const RecordController = require("./controllers/RecordController");
const express = require("express");
const routes = express.Router();

routes.get("/records", RecordController.index);

module.exports = routes;