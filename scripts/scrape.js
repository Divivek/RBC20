

var cheerio = require("cheerio");
var request = require("request");

var scrape = function(callback) {
//  request call to grab the HTML 
request("https://www.nytimes.com/", function(error, response, html) {

  var $ = cheerio.load(html);
 
  var results = [];
  
  $("h2.story-heading").each(function(i, element) {

          var link = $(this).children("a").attr("href");
          var headline = $(this).children("a").text();
         
          var dataToAdd = {
                
             link: link,
             headline : headline,
             date : Date(),
            saved : false 
              
              }   
          results.push(dataToAdd )
        });

  //console.log(results);
  console.log("sending results back");
  callback(results);
});
} // end of scrape function
module.exports = scrape;
    