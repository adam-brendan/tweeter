$(document).ready(function() {
    // character counter for new tweets
    $("textarea").keyup(function() {
        $(".counter").text(140 - ($(this).val().length));
        $("#zero-char").removeClass("displayError");
        $("#long-char").removeClass("displayError");
        $(".tweetbox").removeClass("errorTweetbox");
        if ($(this).val().length > 140) {
            $(".counter").css("color", "red");
        } else {
            $(".counter").css("color", "#244751");
        }
    });

    // toggles collapse/expand of compose tweet window
    $(".compose-button").click(function() {
        $(".new-tweet").slideToggle("slow");
        $(".tweetbox").focus();
    });
});