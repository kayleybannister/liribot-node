//adding code to read / set any environment variables with the dotenv package
require("dotenv").config();

var moment = require("moment");

//Adding code required to import the `keys.js` file and store it in a variable
var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// Axios code
var axios = require("axios");

// FS code
var fs = require("fs");

//===========================================================================================

app( process.argv[2], process.argv[3] );

//===========================================================================================

function app(command, params) {

    switch (command) {

        case "concert-this":
            showBand(params);
            break;
    
        case "movie-this":
            showMovie(params);
            break;
    
        case "spotify-this-song":
            showSong(params);
            break;
    
        case "do-what-it-says":
            doIt();
            break;
    
        default:
                console.log("ERROR - This command is not recognized." + "\nPlease select one of the below commands:" +
                "\nmovie-this spotify-this-song do-what-it-says concert-this");
            break;
    }
};

function showBand(artists)
{
    var queryUrl = "https://rest.bandsintown.com/artists/" + artists + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function(response){
            if (!response.data.length)
            {
                console.log("No result found for " + artists);
                return;
            };

            console.log("Upcoming concerts for " + artists + ": ");
            for (let i = 0; i < response.data.length; i++) {
                const show = response.data[i];

                console.log(show.venue.city + ", " + (show.venue.region || show.venue.country) + " at " + 
                show.venue.name + " " + moment(show.datetime).format("hh:mm a, MM/DD/YYYY"));
                console.log("====================================== \n");
            };
        }
    );
};

// if the liriRequest is equal to movie-this, Axios calls OMDB to search for the movie and return specific info
function showMovie(movie) {
// We then run the request with axios module on a URL with a JSON
axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
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
)};


function showSong(song) {
    
    //run code to Spotify API to display artist info
    spotify.search({type: "track", query: song}, function(err, data)
    {
        if (err) {
            return console.log("Error occurred: " + err);
        }
        
        else {
                for (var i = 0; i < data.tracks.items.length; i++){
                console.log("ARTIST: " + data.tracks.items[i].artists[i].name);
                console.log("SONG NAME: " + data.tracks.items[i].name);
                console.log("SPOTIFY LINK: " + data.tracks.items[i].preview_url);
                console.log("ALBUM: " + data.tracks.items[i].album.name);
                console.log("========================== \n");

                }
            }
    });
};

function doIt(data) {
    fs.readFile("random.txt", "utf8", function(error, data) {

        var dataArr = data.split(",");
        console.log(dataArr);

            if (data.includes("concert-this")){
                showBand();
                }

            else if(data.includes("movie-this")){
                showMovie();
                }

            else if (data.includes("spotify-this-song")){
                showSong();
                }
            else {
                return console.log(error);
            }
        }
        );
};

