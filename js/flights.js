var flightslist = [];

var flight = function(time, location) {
    this.time = time;
    this.location = location;
}

function listFlights() { //gets list of flights using gmail API
    userId = "horamanan@gmail.com";
    var flightquery = "+flight details AND after:2015/09/04";

    var getPageOfFlightMessages = function(request, result) {
        request.execute(function(response) {
            result = result.concat(response.messages);
            console.log(response.result);
            for (var i = 0; i < response.messages.length; i++) {
                var id = response.messages[i].id;
                getFlight(userId, id, flightcallback);
            }

            var nextPageToken = response.nextPageToken;
            if (nextPageToken) {
                request = gapi.client.gmail.users.messages.list({
                    'userId': userId,
                    'pageToken': nextPageToken,
                    'q': flightquery
                });
                getPageOfFlightMessages(request, result);
            } else {
                console.log(flightslist.length);
                // console.log(flightslist);
                // console.log("error");

            }
        });
    };
    var initialRequest = gapi.client.gmail.users.messages.list({
        'userId': userId,
        'q': flightquery
    });
    getPageOfFlightMessages(initialRequest, []);
}


function getFlight(userId, messageId, flightcallback) { //get message-takes in email id (userId) and messageId
    var request = gapi.client.gmail.users.messages.get({
        'userId': userId,
        'id': messageId
    });
    request.execute(flightcallback);
}

var flightcallback = function(data) { //callback function for getMessage()
    console.log("FLIGHT callback")
        // console.log(data.result.snippet);
    var snippet = data.result.snippet;
    // var message = data.result.payload.body.data;

    console.log("snippet" + snippet);
    var m = snippet.search("FROM: ");
    m = m + 6;
    var n = snippet.search("TO: ");
    n = n - 1;
    var location = snippet.substring(m , n );

    var t = snippet.search("AT: ");
    t = t + 4;
    var u = t + 10;
    var time = snippet.substring(t, u);
    var name = "MANAN";
    var flight1 = new flight(time, location);
    flightslist.push(flight1);
}


function generateFlightList() {
    // console.log("printFlightList  ");
    for (var i = 0; i < flightslist.length; i++) {
        // console.log("printFlightList");
        console.log(JSON.stringify(flightslist));
        $('#emails_list').append('<li>'+"FLIGHT location: "+flightslist[i].location+"      Date/time:  "+flightslist[i].time+'</li>');
    }

}
