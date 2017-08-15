var scrape = require("../scripts/scrape");
// bringing the models
var Headlines = require("../models/headlines");
       
module.exports = {
  fetch: function(callback) {

    //  scrape function
     scrape(function(data) {
      
      //console.log("Got data from Back end... Processing ....");
      var headlinedata = data;
      
      for (var i = 0; i < headlinedata.length; i++) {
        headlinedata[i].date = Date();
        headlinedata[i].saved = false;
      }

      //console.log("Trying to insert");
      Headlines.collection.insertMany(headlinedata, { ordered: false }, function(err, docs) {
        callback(err, docs);
      });

    });
  },
  delete: function(query, callback) {
    Headlines.remove(query, callback);
  },
  get: function(query, callback) {
    // prepare the query for the data
    Headlines.find(query)
      .sort({
        _id: -1
      })
      // Execute this query
      .exec(function(err, doc) {
        // callback function
        callback(doc);
      });
  },
  update: function(query, callback) {
   // update the headline
    Headlines.update({ _id: query._id }, {
      $set: query
    }, {}, callback);
  }
};


