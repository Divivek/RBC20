// Controller 


var note = require("../models/notes");
var headlineDate = require("../scripts/scrape");


module.exports = {
  get: function(data, callback) {
    
    note.find({
      _headlineId: data._id
    }, callback);
  },
  
  save: function(data, callback) {

  
    var newNote = {
      _headlineId: data._id,
       date: Date(),
      noteText: data.noteText
    };

    note.create(newNote, function(err, doc) {
     
      if (err) {
        console.log(err);
      }
     
      else {
        console.log(doc);
        
        callback(doc);
      }
    });
  },
  delete: function(data, callback) {
   
    note.remove({
      _id: data._id
    }, callback);
  }
};