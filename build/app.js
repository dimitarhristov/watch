"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.listen(9999, function () {
    console.log("listening on port 3000!");
});
