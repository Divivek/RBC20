// headline model
// Require Mongoose
var mongoose = require ("mongoose");

// creating a schema using Mongoose schema
var Schema = mongoose.Schema;
// creating a headline schema
var headlineSchema = new Schema({
	link: 		{type: String, required: false },
	headline: 	{type: String, required: true,	unique: true },
	date: 		Date,
  	saved: 		{type: Boolean,  default: false}
	});

var headlines = mongoose.model("headlines",headlineSchema);
// export the model
module.exports = headlines;
