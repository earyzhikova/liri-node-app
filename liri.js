require("dotenv").config();
// read and write files
var fs = require("fs");
var request = require("request");
var importkeys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
// Store all of the arguments in an array
var nodeArgs = process.argv;

switch (nodeArgs[2]){
  case "movie-this":
  movieThis();
  break;
  case "my-tweets":
  myTweets();
  break;
  case "spotify-this-song":
  break;
  case "do-what-it-says":
  break;
}



// Twitter data
function myTweets(){

 importkeys.twitter.consumer_key;
 var client = new Twitter(importkeys.twitter);

 client.get('statuses/user_timeline', {screen_name: 'div55Len', count:20}, function(error, tweets, response) {
 if(error) throw error;

for (var key in tweets){
    if (tweets.hasOwnProperty(key)){
        console.log(tweets[key].text);
      console.log(tweets[key].created_at);
    }
   }
  });
 }




 // Spotify data


// var spotify = new Spotify(importkeys.spotify);

// var songName = "";

//   spotify.search({ type: 'track', query: songName }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
//   for (var i = 3; i < nodeArgs.length; i++) {
  
//     songName = songName + "mo" + nodeArgs[i];
// };
// if(songName == "") {
// songName = "+ The Sign";
// }
// var songInfo = data.tracks.items;
// for (var i = 0; i < 5; i++) {
//   if (songInfo[i] != undefined) {
//     var spotifyResults =
//     "Artist: " + songInfo[i].artists[0].name + "\n" +
//     "Song: " + songInfo[i].name + "\n" +
//     "Album: " + songInfo[i].album.name + "\n" +
//     "Preview Url: " + songInfo[i].preview_url + "\n";
    
//     console.log(spotifyResults);
//   };
// };
//   });
  
  // OMDB data


  function movieThis(){
  // Create an empty variable for holding the movie name
  var movie = "";
  
  // Loop through the words in the node argument
  // And do a  for loop to handle the inclusion of "+"s
  for (var i = 3; i < nodeArgs.length; i++) {
  
        movie = movie + "+" + nodeArgs[i];
    };
  if(movie == "") {
    movie = "+ Mr.Nobody";
  }
  var param = movie;
  // run a request to the OMDB API
  var queryUrl = "http://www.omdbapi.com/?t=" + param + "&y=&plot=short&apikey=trilogy";
  
  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);
  
  request(queryUrl, function(error, response, body) {
  
    // If the request is successful
    if (!error && response.statusCode === 200) {
  
      // Parse the body of the site 
      var movieObject = JSON.parse(body);
      var movieResults =  
      "Title: " + movieObject.Title+"\n"+  
      "Year: " + movieObject.Year+"\n"+
      "Imdb Rating: " + movieObject.imdbRating+"\n"+
      "Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\n"+
      "Country: " + movieObject.Country+"\n"+
      "Language: " + movieObject.Language+"\n"+
      "Plot: " + movieObject.Plot+"\n"+
      "Actors: " + movieObject.Actors+"\n";
           
      console.log(movieResults);
    };
  });
  };
