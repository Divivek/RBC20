 RBC20 app that follows this user story:

  1. Whenever a user visits the site, the app will scrape stories from a news outlet NewYork Times. The data  include a link to the story and a headline.

  2. Used Cheerio to grab the site content and Mongoose to save it to  MongoDB database. 

  3. All users can leave comments on the stories collection and  delete whatever comments they want to remove. All stored comments are visible to every user.
  4.  Mongoose's model system  associate comments with particular articles. 
	NPM Pakages-
	 express
	 express-handlebars
	 mongoose
	 body-parser
	 cheerio
	 request
- - -


# RBC20
Scrape News app with Mongoose and cheerio
