require("dotenv").config();
// read and write files
var fs = require("fs");
var request = require("request");
var importkeys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var nodeArgs = process.argv;
var commandInput = "";
for (var i = 3; i < nodeArgs.length; i++) {

  commandInput = commandInput + "+" + nodeArgs[i];
};
switch (nodeArgs[2]) {
  //arguments converted into string
  case "movie-this":
    movieThis(commandInput);
    break;
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
    spotifyThisSong(commandInput);
    break;
  case "do-what-it-says":
    //get the command from random.txt
    //branch to the action based on the command (also pass the additional text in if needed)
    doWhatItSays();
    break;
}



// Twitter data
function myTweets() {

  importkeys.twitter.consumer_key;
  var client = new Twitter(importkeys.twitter);

  client.get('statuses/user_timeline', {
    screen_name: 'div55Len',
    count: 20
  }, function (error, tweets, response) {
    if (error) throw error;

    for (var key in tweets) {
      if (tweets.hasOwnProperty(key)) {
        console.log(tweets[key].text);
        console.log(tweets[key].created_at);
      }
    }
  });
}




// // Spotify data




function spotifyThisSong(songName) {
  var spotify = new Spotify(importkeys.spotify);

  if (songName == "" || typeof songName == 'undefined') {
    songName = "The Sign";
  }

  spotify.search({
      type: 'track',
      query: songName,
    },

    function (err, data) {

      if (err) {
        return console.log('Error occurred: ' + err);
      }



      if (songName != "") {
        var spotifyResults =
          "Artist: " + data.tracks.items[0].album.artists[0].name + "\n" +
          "Song: " + data.tracks.items[0].name + "\n" +
          "Album: " + data.tracks.items[0].album.name + "\n" +
          "Preview Url: " + data.tracks.items[0].preview_url + "\n";


        console.log(spotifyResults);

      }
    });
};





// // OMDB data


function movieThis(movie) {

  if (movie == "" || typeof songName == 'undefined') {
    movie = "+ Mr.Nobody";
  }
  var param = movie;
  // run a request to the OMDB API
  var queryUrl = "http://www.omdbapi.com/?t=" + param + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  // console.log(queryUrl);

  request(queryUrl, function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

      // Parse the body of the site 
      var movieObject = JSON.parse(body);
      var movieResults =
        "Title: " + movieObject.Title + "\n" +
        "Year: " + movieObject.Year + "\n" +
        "Imdb Rating: " + movieObject.imdbRating + "\n" +
        "Rotten Tomatoes Rating: " + movieObject.tomatoRating + "\n" +
        "Country: " + movieObject.Country + "\n" +
        "Language: " + movieObject.Language + "\n" +
        "Plot: " + movieObject.Plot + "\n" +
        "Actors: " + movieObject.Actors + "\n";

      console.log(movieResults);
    };
  });
};


function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (!err) {

      // console.log("Where is the error");
      var myResult = data.split(",");
      // console.log(myResult[0]);
      switch (myResult[0]) {
        case "movie-this":
          movieThis(myResult[1]);
          break;
        case "my-tweets":
          myTweets();
          break;
        case "spotify-this-song":
          spotifyThisSong(myResult[1]);
          break;
      }

      // spotifyThisSong(myResult[0], myResult[1]);
    } else {
      return console.log("Error occured" + err);
    }
  });
};


// function textLog(logResults) {
//   fs.appendFile("log.txt", logResults, (error) =>  {
//     if(error){
//       throw error;
//     }
//   });
// }



//   // Break the string down by comma separation and store the contents into the output array.
//   var output = data.split(",");

//   // Loop Through the newly created output array
//   for (var i = 0; i < output.length; i++) {

// Print each element (item) of the array/
//     console.log(output[i].trim());
//   }