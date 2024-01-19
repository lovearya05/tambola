const express = require("express");

const mainRouter = express.Router();
const utils = require("../util/utils")


mainRouter.get("/", (req, res) => {
    res.send(utils())
});

module.exports = mainRouter;