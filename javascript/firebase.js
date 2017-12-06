$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDoCgy4MtyMmt2lNBA5QTvuhxXXfmJvw4Q",
        authDomain: "music-a-f6e6d.firebaseapp.com",
        databaseURL: "https://music-a-f6e6d.firebaseio.com",
        projectId: "music-a-f6e6d",
        storageBucket: "",
        messagingSenderId: "129942782481"
    };
    firebase.initializeApp(config);


    var db = firebase.database();


    //   variables
    // ================================================================================

    var newArtistInput;
    var artist;
    var searches = [];




    // Submit button function
    // =============================================================================
    $("#add-artist").on("click", function(event) {
        event.preventDefault();

        // get new inputs
        newArtistInput = $("#search-input").val().trim();


        // Capitalizing first letter of each word in string
        function titleCase(str) {
            str = str.toLowerCase().split(' ');

            for (var i = 0; i < str.length; i++) {
                str[i] = str[i].split('');
                str[i][0] = str[i][0].toUpperCase();
                str[i] = str[i].join('');
            }
            return str.join(' ');
        }
        // // console.log(titleCase(newArtistInput));

        newArtistInput = titleCase(newArtistInput);


        $("#show").text(newArtistInput);

        //   Push information into Firebase

        db.ref().push({

            newArtistInput: newArtistInput,

            dateAdded: firebase.database.ServerValue.TIMESTAMP

        }); // end of push information

        // Console log results
        console.log("Artist: " + newArtistInput);



    }); //end of on click function
    // =======================================================================


    // Getting changes from firebase
    db.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());

        // Console.log each change from firebase
        artist = childSnapshot.val().newArtistInput;
        console.log("artist name: " + artist);


        // Comparing previous search to recent search
        if (searches.indexOf(artist) > -1) {
            console.log("artist already exists");
        }
        else {

            // pushing artist to array
            // .unshift() adds to beginning
            searches.unshift(artist);

            // empty out previous searches
            $(".previousSearch").empty();

            // show max of 5, starting at index 0
            for (var i = 0; i < Math.min(searches.length, 30); i++) {
                // Write new information to html
                //new div
                var newDiv = $('<li class="search-keyword"><a class="waves-effect">' + searches[i] + '</a></li>');

                //append new div to html**switched to prepend**
                // now, this should be append, not prepend because we're unshifting
                $(".previousSearch").append(newDiv);
            }

        }

    }); //end of firebase changes



}); //end of function ready
