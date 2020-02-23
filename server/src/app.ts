import express = require("express");
const app = express();
import cors = require("cors");
import bodyParser = require("body-parser");
import logger = require("morgan");

const port = process.env.PORT || 9999;

app.use(logger("dev"));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

import dashboardRouter from "../router/dashboard";
app.use("/dashboard", dashboardRouter);

app.listen(port, function() {
  console.log("Runnning on " + port);
});

module.exports = app;
