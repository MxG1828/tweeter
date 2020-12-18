/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $("form").on("submit", (event) => {
    event.preventDefault();
    $(".error").slideUp();
    //check if input is empty or over 140
    if ($("form").children("textarea").val().length === 0) {
      return $("#emptyErr").slideDown();
    }
    if ($("form").children("textarea").val().length > 140) {
      return $("#exceedErr").slideDown();
    }
    //ajax post input to server .then get the input back and put it on top.
    $.ajax({
      url: "/tweets/",
      data: $("form").serialize(),
      method: "POST",
    }).then(() => {
      $.ajax({ url: "/tweets/", method: "GET" }).then((tweets) => {
        $("#tweetBlocks").prepend(createTweetElement(tweets[tweets.length - 1]));
      });
      $("form").children("textarea").val("");
      $(".counter").val(140);
    });
  });

  const loadTweets = function () {
    $.ajax({ url: "/tweets/", method: "GET" }).then((tweets) => {
      renderTweets(tweets);
    });
  };
  loadTweets();

  const renderTweets = (tweets) => {
    for (let i = tweets.length - 1; i >= 0; i--) {
      const $tweet = createTweetElement(tweets[i]);
      $("#tweetBlocks").append($tweet);
    }
  };
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const createTweetElement = (tweet) => {
    const userName = escape(tweet.user.name);
    const content = escape(tweet.content.text);
    const userHandle = escape(tweet.user.handle);
    const $tweet = $(`
    <article class="tweet">
      <header>
        <p><img src=${tweet.user.avatars} alt="user_icon" style="height:50px; width:50px">${userName}</p>
        <p class="handle">${userHandle}</p>
     </header>
      <div>
        <p>${content}</p>
      </div>
      <footer>
        <p>${timeago.format(tweet.created_at)}</p>
        <p>
          <span class="flaticon-flag-black-shape"></span>
          <span class="flaticon-exchange"></span>
          <span class="flaticon-like"></span>
        </p>
      </footer>
    </article>
    `);
    return $tweet;
  };
  $("#tweetForm").on("click", (evt) => {
    $(".new-tweet").slideToggle({
      complete: () => {
        $("#tweet-text").focus();
      },
    });
  });
  $(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    if (scroll > 120) {
      $("#tweetForm").css("display", "none");
      $("#arrowUp").css("display", "inline");
    } else {
      $("#tweetForm").css("display", "inline");
      $("#arrowUp").css("display", "none");
    }
  });
  $("#arrowUp").click(() => {
    $(window).scrollTop(0);
    $(".new-tweet").slideDown();
    $("#tweet-text").focus();
  });
});
