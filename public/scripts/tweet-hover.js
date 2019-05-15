$(document).ready(function() {
    $(".tweet").mouseover(function() {
        $(".tweet").css("opacity", "1")
        $(".icon").css("opacity", "1")
    })
    $(".tweet").mouseout(function() {
        $(".tweet").css("opacity", "0.5")
        $(".icon").css("opacity", "0")
    })
  });