// var person = $(this).attr("data-name");




$(document).on('click', '#add-artist', function(event) {

    event.preventDefault();
    console.log("buttonworks");

    //In this case, the "this" keyword refers to the button that was clicked
    var artist = $("#search-input").val();
    console.log(artist);

    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?&countryCode=US&sort'date,desc'&keyword=" +
        artist + "&apikey=mUtsvjjuP9U7p30hNtIZXpGAI0rgbThb"

    $.ajax({
        type: "GET",
        url: queryURL,
        async: true,
        dataType: "json",
        success: function(response) {
            console.log(response);

            // console.log(response._embedded.events[0].name)

            // console.log(response._embedded.events[0].dates.start.dateTime);
            var evts = response._embedded.events
            $("#artist-show").empty();
            for (var i = 0; i < 5; i++) {
                console.log(response._embedded.events[i]);

                // Creating a div with the class "item"
                var concertDiv = $("<div class='item'>");
                //Artist's Tour Name
                var tourName = evts[i].name;
                //Concert Date
                var tourDate = evts[i].dates.start.localDate;
                //Concert Time
                var tourTime = response._embedded.events[i].dates.start.localTime;
                var tourTimeC = moment(tourTime, "HH:mm").format('hh:mm a');
                console.log(tourTimeC);
                //Concert Venue Name
                var venue = response._embedded.events[i]._embedded.venues[0].name;
                //Concert Venue City
                var showCity = response._embedded.events[i]._embedded.venues[0].city.name;
                //Concert Venue State
                var showState = response._embedded.events[i]._embedded.venues[0].state.stateCode;
                //link to TicketMaster
                var buyLink = response._embedded.events[i].url;
                console.log("here is your link" + buyLink);
                // //link from Ticket Master to go buy tickets
                // var buyLink2 = $("<a>").html("buy your tickets here: " + buyLink);
                //information returned from TicketMaster API
                var results = $("<p>").html("Tour Name: " + tourName + "<br>" +
                    "Concert Date: " + tourDate + " Time: " + tourTimeC + "<br>" +
                    "Venue: " + venue + " - " + showCity + ", " + showState + "<br>" +
                    "Ticket Link: " + "<a href='" + buyLink + "' target=_'blank'>Click here for Tickets</a>");


                // <a href = "buyLink" target = "_blank">Click< Here</a>



                //Appending the paragraph tag we made for results of API return
                concertDiv.append(results);
                //Putting the concertDiv in artisit show area of HTML
                $("#artist-show").prepend(concertDiv);

            }

        },
        error: function(xhr, status, err) {
            // This time, we do not end up here!
        }
    });
});
