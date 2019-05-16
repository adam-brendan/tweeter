$(document).ready(function() {
    
  function renderTweets(tweets) {
    tweets.forEach(function(element) {
        let $tweetObj = createTweetElement(element);
        $("#main-container").prepend($tweetObj);
    });
  }
    
      const createTweetElement = function(tweetObj) {
        
        // container
        let $tweetBox = $("<article>").addClass("tweet rounded-corners");
        
        // header
        let $tweetHeader = $("<header>").addClass("rounded-corner-top");
        let $tweetAvatar = $("<img>").addClass("user-avatar").attr("src", tweetObj.user.avatars.regular);
        let $headerDiv = $("<div>").addClass("header-texts");
        let $tweetUsername = $("<p>").addClass("user-name").text(tweetObj.user.name);
        let $tweetUserhandle = $("<p>").addClass("user-handle").text(tweetObj.user.handle);
        
        $headerDiv.append($tweetUsername).append($tweetUserhandle);
        $tweetHeader.append($tweetAvatar).append($headerDiv);

        // body
        let $tweetBody = $("<p>").addClass("body");
        $tweetBody.text(tweetObj.content.text);

        // footer
        let $tweetFooter = $("<footer>").addClass("footer");
        let $tweetPostTime = $("<p>").text(tweetObj.created_at);
        let $tweetFlag = $("<img>").addClass("icon").attr("id", "flag").attr("src", "/images/flag.png");
        let $tweetRetweet = $("<img>").addClass("icon").attr("id", "retweet").attr("src", "/images/retweet.png");
        let $tweetFavorite = $("<img>").addClass("icon").attr("id", "fav").attr("src", "/images/favorite.png");
        let $footerDiv = $("<div>").addClass("icons");
        
        $footerDiv.append($tweetFlag).append($tweetRetweet).append($tweetFavorite);
        $tweetFooter.append($tweetPostTime).append($footerDiv);
        
        $tweetBox.append($tweetHeader).append($tweetBody).append($tweetFooter);

        return $tweetBox;
        
    };
    
    // handles the submit event
    $(".new-tweet form").on("submit", function(event) {
      // prevents the event from opening a new page
      event.preventDefault();
      if ($(".tweetbox").val().length === 0) {
        $("#zero-char").addClass("displayError");
        $(".tweetbox").addClass("errorTweetbox");
        $("#long-char").removeClass("displayError");
      } else if ($(".tweetbox").val().length > 140) {
        $("#long-char").addClass("displayError");
        $(".tweetbox").addClass("errorTweetbox");
        $("#zero-char").removeClass("displayError");
      } else {
        $("#zero-char").removeClass("displayError");
        $("#long-char").removeClass("displayError");
        $(".tweetbox").removeClass("errorTweetbox");
        $.ajax({
          method: "POST",
          // in this context, "this" refers to the form data and action refers to /tweets
          url: $(this).attr("action"),
          // serialize turns the output into a string
          data: $(this).serialize()
        }).done(function() {
          $("#main-container").empty();
          loadTweets();
        });
      }
    });

  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: "/tweets",
      data: {
        format: "json"
      }
    })
    .done(function(data) {
      renderTweets(data);
    });
  };

  loadTweets();

});