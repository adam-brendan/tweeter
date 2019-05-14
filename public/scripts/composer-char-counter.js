$(document).ready(function() {
    $("textarea").keyup(function() {
        $(".counter").text(140 - ($(this).val().length));
        console.log($(this).val().length)
        if ($(this).val().length > 140) {
            $(".counter").css("color", "red")
        } else {
            $(".counter").css("color", "#244751")
        }
    })
  });