var flightslist = [];

var flight = function(name, time, location) {
    this.name = name;
    this.time = time;
    this.location = location;
}

function listFlights() { //gets list of flights using gmail API
    userId = $('#emailid').val();
    var d = new Date(); //get current date
    var n = d.getDate();
    n = n - 2;
    // var messagequery = "after:2015/09/03";

    var flightquery = "+flight ticket";
    var getPageOfFlightMessages = function(request, result) {
        request.execute(function(resp) {
            result = result.concat(resp.messages);

            for (var i = 0; i < resp.messages.length; i++) {
                //messages list = resp.messages
                var id = resp.messages[i].id;
                getFlight(userId, id, callback);
            }

            var nextPageToken = resp.nextPageToken;
            if (nextPageToken) {
                request = gapi.client.gmail.users.messages.list({
                    'userId': userId,
                    'pageToken': nextPageToken,
                    'q': flightquery
                });
                getPageOfFlightMessages(request, result);
            } else {
                console.log(flightslist.length);
                console.log(flightslist);
                console.log("error");

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
    console.log(data.result.snippet);
    var snippet = data.result.snippet;
    var location = null;
    var time = null;
    var name = null; //get name from google..
    var flight = new flight(name, time, location);
    flightslist.push(message);
}
