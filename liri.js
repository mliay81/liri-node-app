// This was arduous.

// Spotify, Twitter, dotenv, and request all installed

require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter")
var Spotify = require("node-spotify-api")
var request = require("request")
var omdb = require("omdb")
var fs = require('fs')

var action = process.argv[2]

var argument = ""

switchCase(action, argument)

function switchCase(action, argument) {
 switch (action) {
     case "my-tweets":
     tweets()
     break;

     case "movie-this":
     movies()
     break;

     case "spotify-this-song":
     spotify()
     break;
 }
}

// Twitter - "my-tweets"

function tweets() {

// This is pulling Twitter keys, don't screw with it
    var client = new Twitter(keys.twitter)

    var params = {screen_name: "@NotABot02939830", count: 20}

    // This works, don't change it. 
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        // if (!error) {
        //     for (var i = 0; i < tweets.statuses.length; i++) {
        //         var tweetText = tweets.statuses[i].text;
        //         console.log(tweetText);
        //         // var tweetCreationDate = tweets.statuses[i].created_at;
        //         // console.log("Tweet Creation Date: " + tweetCreationDate);
        //     console.log(tweetText)
        //     }
        // } else {
        //     console.log(error);
        // }
        
        // This returned a thing
        console.log(tweets[0].text)
        console.log(tweets[1].text)
        console.log(tweets[2].text)
    })
}

// tweets()


// Spotify - "spotify-this-song"
function spotify(query) {
    console.log(keys.spotify)
    var spotify = new Spotify(keys.spotify)
    var song = process.argv[3]
    spotify.search({ type: "track", query: song}, function(error, data) {
        if (error) {
            console.log("error occurred")
        }
        console.log(`
        Artist: ${data.tracks.items[0].album.artists[0].name}
        Song: ${data.tracks.items[0].name}
        Preview: ${data.tracks.items[0].external_urls.spotify}
        Album: ${data.tracks.items[0].album.name}`)
        // console.log(data.tracks.items[0])
        // fs.writeFile('items.txt', JSON.stringify(data))
    })
}




// var spotify = new Spotify(keys)
// // console.log(spotify)

 
// const params = {
//     q: 'Demi', // required
//   }
//   spotify.search(params)
//     .then(data => {
//       console.log(data)
//     })

// Movies - "movie-this"
function movies() {

var nodeArgs = process.argv

var movieName = ""

    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
      
          movieName = movieName + "+" + nodeArgs[i];
      
        }
      
        else {
      
          movieName += nodeArgs[i];
      
        }
      }
      
      // Then run a request to the OMDB API with the movie specified
      var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
      
      // This line is just to help us debug against the actual URL.
      console.log(queryUrl);
      
      request(queryUrl, function(error, response, body) {
    //   console.log(response)
        // If the request is successful
        if (!error && response.statusCode === 200) {
            // console.log(JSON.parse(body))
          // Parse the body of the site and recover just the imdbRating
          // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
          console.log("Release Year: " + JSON.parse(body).Year);
          console.log("Title: " + JSON.parse(body).Title)
          console.log("Rating: " + JSON.parse(body).Rating)
          console.log("Language: " + JSON.parse(body).Language)
          console.log("Plot: " + JSON.parse(body).Plot)
          console.log("Cast: " + JSON.parse(body).Actors)
        //   console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1])
        console.log("Country: " + JSON.parse(body).Country)
        }
      });
    }

    // movies()