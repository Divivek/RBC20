var scrape = require("../scripts/scrape");
var headlineController = require("../controllers/headline");
var notesController = require("../controllers/note");

module.exports = function(router) {

	router.get("/", function(req,res) {
		res.render("home");
	});

	router.get("/saved", function(req,res) {
		res.render("saved");
	});

	router.get("/api/fetch" , function(req,res){

		headlineController.fetch(function(err,docs) {
			if(!docs || docs.indertedCount === 0){
				res.json({
					msg: "No News,check back tomorrow"
				});

			}
			else{
				res.json({
				msg: "Added " + docs.insertedCount + " new headlinedata!"	
				})
			}
		});
	});
  
  	router.get("/api/headlines" , function(req, res){
  		var query ={};
  		if(req.query.saved) {
  			query = req.query;
  		}

  	headlineController.get(query,function(data) {
  		res.json(data);

  	})
  });

    
  	router.delete("/api/headline/:id", function(req,res){
  	var query =	{};
  	query._id =req.params.id;


  	 headlineController.delete(query, function(err, data) {
     
      res.json(data);
    });
  });

 

  router.patch("/api/headlines", function(req, res) {

  

    headlineController.update(req.body, function(err, data) {
 
      res.json(data);
    });
  });

  router.get("/api/note/:headline_id?", function(req, res) {

    var query = {};
    if (req.params.headline_id) {
      query._id = req.params.headline_id;
    }

    notesController.get(query, function(err, data) {

      // Send the note data back to the user as JSON


      res.json(data);
    });
  });

  
  router.delete("/api/note/:id", function(req, res) {
    var query = {};
    query._id = req.params.id;

  
    notesController.delete(query, function(err, data) {
    
      res.json(data);
    });
  });


  router.post("/api/note", function(req, res) {
    notesController.save(req.body, function(data) {
     // console.log("Back to Route..................")
      res.json(data);
    });
  });

}


