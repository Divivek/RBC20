
$(document).ready(function() {
 
  var newsbox = $(".article-container");
  $(document).on("click", ".btn.save", newsSave);
  $(document).on("click", ".scrape-new", newScrape);

  initPage();

  function initPage() {
  
    console.log("INIT")
    newsbox.empty();
    $.get("/api/headlines?saved=false")
      .then(function(data) {
        // render headlines
        if (data && data.length) {
          renderNews(data);
        }
        else {
          // no news
          renderEmpty();
        }
      });
  }

  function renderNews(news) {
   
    var newsPanels = [];

    for (var i = 0; i < news.length; i++) {
      newsPanels.push(createPanel(news[i]));
    }
    
   newsbox.append(newsPanels);
  }

  function createPanel(article) {
   
    var panel =
      $(["<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        "<h3>",
      article.headline,
        "<a class='btn btn-success save'>",
        "Save Article",
        "</a>",
        "</h3>",
        "</div>",
        "<div class='panel-body'>",
        "<a href='"+article.link+"'>",
      article.link,
      "</a>",

        "</div>",
        "</div>"
      ].join(""));
   
    panel.data("_id", article._id);

    return panel;
  }

  function renderEmpty() {

    var emptyAlert =
      $(["<div class='alert alert-warning text-center'>",
        "<h4>No new news.</h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3>What Would You Like To Do?</h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a class='scrape-new'>Try Scraping New news</a></h4>",
        "<h4><a href='/saved'>Go to Saved news</a></h4>",
        "</div>",
        "</div>"
      ].join(""));
 
    newsbox.append(emptyAlert);
  }

  function newsSave() {
    
    var newsToSave = $(this).parents(".panel").data();
    newsToSave.saved = true;
    
    $.ajax({
      method: "PATCH",
      url: "/api/headlines",
      data: newsToSave
    })
    .then(function(data) {
    
      if (data.ok) {
       
        initPage();
      }
    });
  }

  function newScrape() {
    
    $.get("/api/fetch")
      .then(function(data) {
     
        initPage();
        bootbox.alert("<h3 class='text-center m-top-80'>" + data.msg + "<h3>");
      });
  }
});
