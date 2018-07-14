// Spotify, Twitter, dotenv, and request all installed

require("dotenv").config();
var twitter = require("twitter")
var spotify = require("spotify")


var keys = require("./keys.js");

var spotify = new Spotify(exports.spotify)

var client = new Twitter(exports.twitter)


console.log(spotify)

console.log(client)