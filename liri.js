//adding code to read / set any environment variables with the dotenv package
require("dotenv").config();

var dotenv = require("dotenv");

//Adding code required to import the `keys.js` file and store it in a variable.
var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// Axios code
var axios = require("axios");
var movieTitle = process.argv[2];

// We then run the request with axios module on a URL with a JSON
axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy").then(
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
);