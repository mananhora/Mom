var flightslist = [];

var flight = function( time, location) {
    this.time = time;
    this.location = location;
}

function listFlights() { //gets list of flights using gmail API
    userId = $('#emailid').val();
    var flightquery = "+upcoming flight AND after:2015/09/04";

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


function getFlight(userId, messageId, callback) { //get message-takes in email id (userId) and messageId
    var request = gapi.client.gmail.users.messages.get({
        'userId': userId,
        'id': messageId
    });
    request.execute(flightcallback);
}

var flightcallback = function(data) { //callback function for getMessage()
    // console.log(data.result.snippet);
    var snippet = data.result.snippet;
    // var message = data.result.payload.body.data;

    console.log(snippet);
    var location = null;
    var time = null;
    var name = null; 
    var flight1 = new flight(name, time, location);
    flightslist.push(flight1);
}


function generateFlightList() {
    console.log("printFlightList  ");
    for (var i = 0; i < flightslist.length; i++) {
        console.log("printFlightList");
        $('#emails_list').append(flightslist[i].name);
    }

}
