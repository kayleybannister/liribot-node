//adding code to read / set any environment variables with the dotenv package
require("dotenv").config();

//Adding code required to import the `keys.js` file and store it in a variable.
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);