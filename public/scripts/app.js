
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // Test / driver code (temporary). Eventually will get this from the server.

 $(document).ready(function() {
    const tweetData = {
        "user": {
        "name": "Newton",
        "avatars": {
            "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
            "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
            "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"   
        },
        "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
        },
        "created_at": 1461116232227
    }
    

    const createTweetElement = function(tweetObj) {
        
        // container
        var $tweetBox = $("<article>").addClass("tweet rounded-corners")
        
        // header
        var $tweetHeader = $("<header>").addClass("rounded-corner-top")
        var $tweetAvatar = $("<img>").addClass("user-avatar")
        $tweetAvatar.attr("src", tweetData.user.avatars.regular)
        var $tweetUsername = $("<p>").addClass("user-name header-texts")
        $tweetUsername.text(tweetObj.user.name)
        var $tweetUserhandle = $("<p>").addClass("user-handle header-texts")
        $tweetUserhandle.text(tweetObj.user.handle)
        
        $tweetHeader.append($tweetAvatar).append($tweetUsername).append($tweetUserhandle)

        // body
        var $tweetBody = $("<p>").addClass("body")
        $tweetBody.text(tweetObj.content.text)

        // footer
        var $tweetFooter = $("<footer>").addClass("footer")
        var $tweetPostTime = $("<p>")
        $tweetPostTime.text(tweetData.created_at)
        
        $tweetFooter.append($tweetPostTime)
        
        return $tweetBox.append($tweetHeader).append($tweetBody).append($tweetFooter)
        
    }
    
    var $tweet = createTweetElement(tweetData);
    
    // Test / driver code (temporary)
    console.log($tweet); // to see what it looks like
    $('#main-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
 })
