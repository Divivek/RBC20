// require Mongoose
var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
// creating note schema with schema object
var noteSchema = new Schema({
	_headlineId: {
		type:Schema.Types.ObjectId,
		ref:"headlines"
	},
	 date: String,
 
  noteText: String
  
});
// create note models using the noteSchema
var note = Mongoose.model("Note",noteSchema);
// export the note model
module.exports = note;
