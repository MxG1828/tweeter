$(document).ready(function () {
  // --- our code goes here ---
  
  $("#tweet-text").on("input", function () {
    let count = 140 - $(this).val().length;
    $(this).siblings("div").children("output.counter").val(count);
    if(count < 0){
      $(this).siblings("div").children("output.counter").css("color","red")
    }else{
      $(this).siblings("div").children("output.counter").css("color","#545149")
    }
  });
});
