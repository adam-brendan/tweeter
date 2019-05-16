$(document).ready(function() {
    
  function renderTweets(tweets) {
    tweets.forEach(function(element) {
        let $tweetObj = createTweetElement(element)
        $("#main-container").prepend($tweetObj)
    })
  }
    
      const createTweetElement = function(tweetObj) {
        
        // container
        let $tweetBox = $("<article>").addClass("tweet rounded-corners");
        
        // header
        let $tweetHeader = $("<header>").addClass("rounded-corner-top");
        let $tweetAvatar = $("<img>").addClass("user-avatar");
        $tweetAvatar.attr("src", tweetObj.user.avatars.regular);
        let $tweetUsername = $("<p>").addClass("user-name header-texts");
        $tweetUsername.text(tweetObj.user.name);
        let $tweetUserhandle = $("<p>").addClass("user-handle header-texts");
        $tweetUserhandle.text(tweetObj.user.handle);
        
        $tweetHeader.append($tweetAvatar).append($tweetUsername).append($tweetUserhandle);

        // body
        let $tweetBody = $("<p>").addClass("body");
        $tweetBody.text(tweetObj.content.text);

        // footer
        let $tweetFooter = $("<footer>").addClass("footer");
        let $tweetPostTime = $("<p>");
        $tweetPostTime.text(tweetObj.created_at);
        let $tweetFlag = $("<img>").addClass("icon");
        let $tweetRetweet = $("<img>").addClass("icon");
        let $tweetFavorite = $("<img>").addClass("icon");
        $tweetFlag.attr("src", "/images/flag.png");
        $tweetRetweet.attr("src", "/images/retweet.png");
        $tweetFavorite.attr("src", "/images/favorite.png");
        
        $tweetFooter.append($tweetPostTime).append($tweetFlag).append($tweetRetweet).append($tweetFavorite);
        $tweetBox.append($tweetHeader).append($tweetBody).append($tweetFooter);

        return $tweetBox;
        
    };
    // renderTweets(data);
    
    // handles the submit event
    $(".new-tweet form").on("submit", function(event) {
      // prevents the event from opening a new page
      event.preventDefault();
      if ($(".tweetbox").val().length === 0) {
        $("#zero-char").addClass("displayError");
        $(".tweetbox").addClass("errorTweetbox")
        $("#long-char").removeClass("displayError");
      } else if ($(".tweetbox").val().length > 140) {
        $("#long-char").addClass("displayError")
        $(".tweetbox").addClass("errorTweetbox")
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
        })
      }
    })

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
    })
  }

  loadTweets();

 });