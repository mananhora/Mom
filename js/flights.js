var flightslist = [];

var flight = function(time, location) {
    this.time = time;
    this.location = location;
}

function listFlights() { //gets list of flights using gmail API
    userId = "anas.ashraf.14@gmail.com";
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
        $('#emails_list').append('<p class="subject">'+"FLIGHT location: "+flightslist[i].location+"      Date/time:  "+flightslist[i].time+'</p>');
        $('#replyBtns').append('<ul class="inline-list"> <li> <a href="#"> <svg version="1.1" id="reply" class="reply" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 31 36" enable-background="new 0 0 31 36" xml:space="preserve"> <path fill="#CDCDCD" d="M13.9,19.4c0,1.9,0,3.7,0,5.9c-4.7-3.6-9.2-7-13.9-10.5C4.6,11,9.1,7.4,13.8,3.6c0,2.1,0,4,0,6 c1.6,0,3.2,0,4.7,0c6.2-0.2,11.1,3.6,12.2,9.4c1.2,6.1-2.9,12.3-9,13.4c2.2-3,2.7-6.1,0.8-9.3C20.7,19.8,17.6,18.9,13.9,19.4z"/> </svg> </a> </li><li> <a href="#" data-reveal-id="remindModal"> <svg version="1.1" id="replyReminder" class="replyReminder" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 31 38" enable-background="new 0 0 31 38" xml:space="preserve"> <g> <path fill="#CBCBCB" d="M15.5,35.4c-8.3,0-15.1-6.8-15.1-15.1c0-8.3,6.8-15.1,15.1-15.1s15.1,6.8,15.1,15.1 C30.6,28.6,23.8,35.4,15.5,35.4z M15.5,8.2c-6.6,0-12,5.4-12,12s5.4,12,12,12c6.6,0,12-5.4,12-12S22.1,8.2,15.5,8.2z"/> </g> <g> <rect x="13.9" y="2.1" fill="#CBCBCB" width="3.1" height="4.6"/> </g> <g> <path fill="#CBCBCB" d="M19.1,3.6h-7.3c-0.9,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5h7.3c0.9,0,1.5,0.7,1.5,1.5S20,3.6,19.1,3.6z"/> </g> <g> <path fill="#CBCBCB" d="M4.3,36.6c-0.3,0-0.6-0.1-0.9-0.3c-0.7-0.5-0.9-1.5-0.4-2.1l2.9-4c0.5-0.7,1.5-0.9,2.1-0.4 c0.7,0.5,0.9,1.5,0.4,2.1l-2.9,4C5.3,36.3,4.8,36.6,4.3,36.6z"/> </g> <g> <path fill="#CBCBCB" d="M26.8,36.6c-0.5,0-1-0.2-1.3-0.6l-2.9-4c-0.5-0.7-0.3-1.7,0.4-2.1c0.7-0.5,1.7-0.3,2.1,0.4l2.9,4 c0.5,0.7,0.3,1.7-0.4,2.1C27.4,36.5,27.1,36.6,26.8,36.6z"/> </g> <g> <path fill="#CBCBCB" d="M27.7,9.6L24.9,7c-0.8-0.7-0.8-2-0.1-2.8l0,0c0.7-0.8,2-0.8,2.8-0.1l2.8,2.7c0.8,0.7,0.8,2,0.1,2.8l0,0 C29.7,10.3,28.5,10.4,27.7,9.6z"/> </g> <g> <path fill="#CBCBCB" d="M3.3,9.6L6.1,7c0.8-0.7,0.8-2,0.1-2.8l0,0c-0.7-0.8-2-0.8-2.8-0.1L0.6,6.8c-0.8,0.7-0.8,2-0.1,2.8l0,0 C1.3,10.3,2.5,10.4,3.3,9.6z"/> </g> <g> <path fill="#CBCBCB" d="M14.6,21.1c0,1,0,2.1,0,3.3c-2.6-2-5.1-3.9-7.7-5.8c2.6-2.1,5.1-4.1,7.7-6.2c0,1.2,0,2.2,0,3.3 c0.9,0,1.8,0,2.6,0c3.4-0.1,6.2,2,6.8,5.2c0.7,3.4-1.6,6.8-5,7.4c1.2-1.7,1.5-3.4,0.4-5.2C18.4,21.3,16.7,20.8,14.6,21.1z"/> </g> </svg> </a> </li></ul>');
    }

}
