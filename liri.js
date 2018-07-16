// Spotify, Twitter, dotenv, and request all installed

require("dotenv").config();
var keys = require("./keys.js");
var twitter = require("twitter")
// var spotify = require("spotify-finder")


// console.log(spotify.consumer.key)
// console.log(twitter.consumer_key)

// This is pulling Twitter keys, don't screw with it
var client = new twitter(keys.twitter)
// console.log(client)

client.stream('statuses/filter', {track: 'NotABot'},  function(stream) {
    stream.on('data', function(tweet) {
      console.log(tweet.text);
    });
  
    stream.on('error', function(error) {
      console.log(error);
    });
  });
// var music = new spotify(keys.spotify)
// console.log(music)
