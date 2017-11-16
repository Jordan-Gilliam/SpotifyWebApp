$(document).ready(function() {


    //GLOBAL VARIABLES
    //=========================


    //FUNCTIONS
    //==========================

    function spotifySearch(artist) {

        var queryURL = "https://api.spotify.com/v1/search?q=" + artist + "&type=artist&market=US&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET",
            headers: {
                "Authorization": "Bearer BQA8Lz1SKRytCuzox8TIXQDIwDZ-AiezXt_UbbDd4NQI5vSaXrWoi3uQt0HOgnFSjwLK4a93sRw6XwqvxTa_bw"
            }
        }).done(function(response) {
            var results = response;
            console.log(results);

            var artistID = results.artists.items[0].id;
            spotifyTopTracks(artistID);
            spotifyRelatedArtist(artistID);
        });

    }


    function spotifyTopTracks(artistID) {

        $("#tracksContainer").empty();

        var queryURL = "https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?country=US";

        $.ajax({
            url: queryURL,
            method: "GET",
            headers: {
                "Authorization": "BQA8Lz1SKRytCuzox8TIXQDIwDZ-AiezXt_UbbDd4NQI5vSaXrWoi3uQt0HOgnFSjwLK4a93sRw6XwqvxTa_bw"
            }
        }).done(function(response) {
            var results = response;
            console.log(results);

            var albumDiv = $("<div>");
            var p = $("<p>").text("Top Tracks").css("font-weight", "bold");

            for (var i = 0; i < results.tracks.length; i++) {

                var albumName = results.tracks[i].album.name;
                var trackName = results.tracks[i].name;
                var image = $("<img>");
                image.attr("src", response.tracks[i].album.images[2].url);
                image.attr("href", response.tracks[0].external_urls.spotify);

                var trackInfo = "<p>Album name: " + albumName + "<br>Track name: " + trackName + "</p>";


                albumDiv.prepend(p);
                albumDiv.append(trackInfo);
                albumDiv.append(image);

                $("#tracksContainer").append(albumDiv);
            }

        });
    }


    function spotifyRelatedArtist(artistID) {
        $("#relatedArtistContainer").empty();

        var queryURL = "https://api.spotify.com/v1/artists/" + artistID + "/related-artists";

        $.ajax({
            url: queryURL,
            method: "GET",
            headers: {
                "Authorization": "Bearer BQA8Lz1SKRytCuzox8TIXQDIwDZ-AiezXt_UbbDd4NQI5vSaXrWoi3uQt0HOgnFSjwLK4a93sRw6XwqvxTa_bw"
            }
        }).done(function(response) {
            var results = response;
            console.log(results);

            for (var j = 0; j < results.artists.length; j++) {
                var relatedArtist = results.artists[j].name + "<br>";

                $("#relatedArtistContainer").append(relatedArtist);
            }

        });

    }



    //MAIN PROCESS
    //=============================

    $("#add-artist").on("click", function(event) {
        event.preventDefault();
        var formAdd = $("#search-input").val().trim().toLowerCase();
        spotifySearch(formAdd);
    });



});
