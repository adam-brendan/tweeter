/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // Test / driver code (temporary). Eventually will get this from the server.

 $(document).ready(function() {
    
    // const data = [
    //     {
    //       "user": {
    //         "name": "Newton",
    //         "avatars": {
    //           "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
    //           "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
    //           "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    //         },
    //         "handle": "@SirIsaac"
    //       },
    //       "content": {
    //         "text": "If I have seen further it is by standing on the shoulders of giants"
    //       },
    //       "created_at": 1461116232227
    //     },
    //     {
    //       "user": {
    //         "name": "Descartes",
    //         "avatars": {
    //           "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
    //           "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
    //           "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
    //         },
    //         "handle": "@rd" },
    //       "content": {
    //         "text": "Je pense , donc je suis"
    //       },
    //       "created_at": 1461113959088
    //     },
    //     {
    //       "user": {
    //         "name": "Johann von Goethe",
    //         "avatars": {
    //           "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
    //           "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
    //           "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
    //         },
    //         "handle": "@johann49"
    //       },
    //       "content": {
    //         "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    //       },
    //       "created_at": 1461113796368
    //     }
    // ];
    

    function renderTweets(tweets) {
        tweets.forEach(function(element) {
            let $tweetObj = createTweetElement(element)
            $("#main-container").append($tweetObj)
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
        alert("You have to type something!")
      } else if ($(".tweetbox").val().length > 140) {
        alert("Your tweet is too long!")
      } else {
        $.ajax({
          method: "POST",
          // in this context, "this" refers to the form data and action refers to /tweets
          url: $(this).attr("action"),
          // serialize turns the output into a string
          data: $(this).serialize()
        }).done(function() {
          console.log("request done")
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