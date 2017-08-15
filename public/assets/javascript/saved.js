
$(document).ready(function() {
  
  var newsbox = $(".article-container");

  $(document).on("click", ".btn.delete", newsDelete);
  $(document).on("click", ".btn.notes", newclips);
  $(document).on("click", ".btn.save", newsSave);
  $(document).on("click", ".btn.note-delete", newsClipsDelete);

  initPage();

  function initPage() {
  
    newsbox.empty();
    $.get("/api/headlines?saved=true").then(function(data) {
         if (data && data.length) {
        renderNews(data);
      } else {
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

  function createPanel(news) {
    
    var panel =
      $(["<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        "<h3>",
        news.headline,
        "<a class='btn btn-danger delete'>",
        "Delete ",
        "</a>",
        "<a class='btn btn-success notes'> New News </a>",
        "</h3>",
        "</div>",
        "<div class='panel-body'>",
        news.link,
        "</div>",
        "</div>"
      ].join(""));
    
    panel.data("_id", news._id);
    
    return panel;
  }

  function renderEmpty() {

    var emptyAlert =
      $(["<div class='alert alert-warning text-center'>",
        "<h4>Uh Oh. Looks like we don't have any saved news.</h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3>Would You Like to Browse Available News?</h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a href='/'>Browse News</a></h4>",
        "</div>",
        "</div>"
      ].join(""));
  
    newsContainer.append(emptyAlert);
  }

  function renderList(data) {
  
    var renderNotes = [];
    var currentNote;
    if (!data.notes.length) {
         currentNote = [
        "<li class='list-group-item'>",
        "No notes for this news yet.",
        "</li>"
      ].join("");
      renderNotes.push(currentNote);
    }
    else {
     
      for (var i = 0; i < data.notes.length; i++) {
          currentNote = $([
          "<li class='list-group-item note'>",
          data.notes[i].noteText,
          "<button class='btn btn-danger note-delete'>x</button>",
          "</li>"
        ].join(""));
         currentNote.children("button").data("_id", data.notes[i]._id);
         renderNotes.push(currentNote);
      }
    }
   
    $(".note-container").append(renderNotes);
  }

  function newsDelete() {
      var newsdelete = $(this).parents(".panel").data();
       $.ajax({
      method: "DELETE",
      url: "/api/headline/" + newsdelete._id
    }).then(function(data) {
        if (data.ok) {
        initPage();
      }
    });
  }

  function newclips() {

    var currentNews = $(this).parents(".panel").data();
       $.get("/api/note/" + currentNews._id).then(function(data) {
         var modalText = [
        "<div class='container-fluid text-center'>",
        "<h4>Notes For News: ",
        currentNews._id,
        "</h4>",
        "<hr />",
        "<ul class='list-group note-container'>",
        "</ul>",
        "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
        "<button class='btn btn-success save'>Save Note</button>",
        "</div>"
      ].join("");
        bootbox.dialog({
        message: modalText,
        closeButton: true
      });
      var noteData = {
        _id: currentNews._id,
        notes: data || []
      };
     
      $(".btn.save").data("news", noteData);
  
      renderList(noteData);
    });
  }

  function newsSave() {
    var noteData;
    var userNotes = $(".bootbox-body textarea").val().trim();

    if (userNotes) {
      noteData = {
        _id: $(this).data("news")._id,
        noteText: userNotes
      };
      $.post("/api/note", noteData).then(function() {
     
        bootbox.hideAll();
      });
    }
  }

  function newsClipsDelete() {
    
    var newsToDelete = $(this).data("_id");
   
    $.ajax({
      url: "/api/note/" + newsToDelete,
      method: "DELETE"
    }).then(function() {
      
      bootbox.hideAll();
    });
  }
  

});
