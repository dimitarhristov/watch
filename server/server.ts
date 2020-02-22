import express = require("express");

const app: express.Application = express();

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.listen(9999, function() {
  console.log("listening on port 9999");
});
