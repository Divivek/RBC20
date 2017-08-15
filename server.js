// dependencies
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var expressHandlebars = require("express-handlebars");

var PORT = process.env.PORT || 3000;


var app = express();


var router = express.Router();

require("./config/routes")(router);

app.use(express.static(__dirname + "/public"));

 // Connect Handlebars to our Express app
app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(router);


//var db = process.env.MONGODB_URI || "mongodb://localhost/mongoheadlines";

var db = "mongodb://heroku_dcwnrkp8:cr021p9g1m1rlsr1snaob7tefq@ds029476.mlab.com:29476/heroku_dcwnrkp8"
mongoose.connect(db, function(error) {
  if (error) {
    console.log(error);
  }
  
  else {
    console.log("mongoose connection is successful");
  }
});

app.listen(PORT, function() {
  console.log("Listening on port:" + PORT);
});
