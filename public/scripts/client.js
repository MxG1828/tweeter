/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  let tweetData = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1607928810558,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1608015210558,
    },
  ];
  const renderTweets = (tweets) => {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweetBlocks").append($tweet);
    }
  };

  const createTweetElement = (tweet) => {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <p><img src=${tweet.user.avatars} alt="user_icon" style="height:50px; width:50px">${tweet.user.name}</p>
          <p class="handle">${tweet.user.handle}</p>
        </header>
        <div>
          <p>${tweet.content.text}</p>
        </div>
        <footer>
          <p>${timeago.format(tweet.created_at)}</p>
        </footer>
      </article>
      `);

    return $tweet;
  };
  renderTweets(tweetData);
});
