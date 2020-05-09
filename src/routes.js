const RecordController = require("./controllers/RecordController");
const express = require("express");
const routes = express.Router();

routes.get("/records", RecordController.index);
routes.get("/records/:id", RecordController.read);
routes.post("/records", RecordController.create);
routes.delete("/records/:id", RecordController.delete);

module.exports = routes;