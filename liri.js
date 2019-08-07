//adding code to read / set any environment variables with the dotenv package
require("dotenv").config();

var dotenv = require("dotenv");

//Adding code required to import the `keys.js` file and store it in a variable.
var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// Axios code
var axios = require("axios");

var selectThis = process.argv[2];
var selection = process.argv[3];

if (selectThis === "movie-this") {
// We then run the request with axios module on a URL with a JSON
axios.get("http://www.omdbapi.com/?t=" + selection + "&y=&plot=short&apikey=trilogy").then(
  function(response) {
    // Then we print out the imdbRating
    console.log("TITLE: " + response.data.Title);
    console.log("RELEASE YEAR: " + response.data.Year);
    console.log("IMDB RATING: " + response.data.imdbRating);
    console.log("PRODUCTION COUNTRY: " + response.data.Country);
    console.log("LANGUAGE: " + response.data.Language);
    console.log("PLOT: " + response.data.Plot);
    console.log("ACTORS: " + response.data.Actors);
  }
)}

else if (selectThis === "concert-this")
{
    //run code for Bands in Town API to display location and venue for this artist
    //Need Bands in Town API - requested
    console.log("CONCERT FOR: " + selection);
}

else if (selectThis === "spotify-this-song")
{
    //run code to Spotify API to display artist info
    console.log("PLAY THIS SONG: " + selection);
}

else if (selectThis === "do-what-it-says") 
{
    //run code to add to random.txt file
    console.log("YOU TOLD ME TO: " + selection);
}
