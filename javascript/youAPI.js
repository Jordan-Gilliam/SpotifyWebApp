// $(document).ready(function() {

var vidWidth = 500;
var vidHeight = 400;
var vidResults = 1;



// Get form input


// run get request on api
function youtubeSearch(q) {
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: "snippet, id",
            q: q,
            type: "video",
            maxResults: vidResults,
            key: "AIzaSyAGv4U7CiZsMwdmwLWnM6G4-Lzrx-97B2o"
        },
        function(data) {
            var output;
            $.each(data.items, function(i, item) {
                console.log(item);
                var videoId = item.id.videoId;

                output = '<li><iframe height="' + vidHeight + '" width="' + vidWidth + '" src=\"https://www.youtube.com/embed/' + videoId + '\"></li>';

                $("#youTube").html(output);

            });
        }
    );
}






// });



$(document).on("click", "#add-artist", function(event) {
    event.preventDefault();
    var q = $("#search-input").val().trim();
    youtubeSearch(q);


});

$(document).on("click", ".search-keyword", function() {
    var q = $(this).text();
    youtubeSearch(q);
});
