/* global firebase */

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAVerdEkGUJR2sBqWYAmilczIDkkEEOvF8",
    authDomain: "search-band.firebaseapp.com",
    databaseURL: "https://search-band.firebaseio.com",
    projectId: "search-band",
    storageBucket: "search-band.appspot.com",
    messagingSenderId: "501332999215"
};
firebase.initializeApp(config);

var database = firebase.database();


$("#add-artist").on("click", function(event) {
    event.preventDefault();

    var searchInput = $("#search-input").val().trim();

    database.ref().push({
        searchInput: searchInput
    });

    $("#search-input").val("");
});



database.ref().on("value", function(snapshot) {

    var displaySearchInput = snapshot.val().searchInput;

    $("#searchHistoryContainer").append(displaySearchInput);

});
