// Require the controller
const controller = require("./controller");

const express = require("express");

// Route
const route = express.Router();

route.get("/", controller.getAllDevelopers);
route.get("/:id", controller.getDeveloperById);
route.post("/", controller.checkBody, controller.createDeveloper);
route.patch("/:id", controller.editDeveloperData);
route.delete("/:id", controller.deleteDeveloper);
module.exports = route;
