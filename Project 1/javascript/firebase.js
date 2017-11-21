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

    var searchInput;



    // Submit button function
    // =============================================================================
    $("#add-artist").on("click", function(event) {
        event.preventDefault();

        // get new inputs
        newArtistInput = $("#search-input").val().trim();

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
        var artist = childSnapshot.val().newArtistInput;
        console.log("artist name: " + artist);



        // Write new information to html
        //new div
        var newDiv = $('<li><a class="waves-effect">' + artist + '</a></li>');


        //append new div to html**switched to prepend**
        $("#previousSearch").prepend(newDiv);





    }); //end of firebase changes

























}); //end of function ready
