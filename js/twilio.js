//SEND DATA TO TWILIO

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function sendDataTwilio() {
    //SEND EMAIL DATA
    for (var i = 0; i < emailList.length; i++) {

        email = emailList[i]; //get email
        if (email.replyTime != null) { //if the replyTime has been set by the user.
            //send data to twilio...
            var subject = email.subject;
            var time = email.replyTime;
            var name = "Manan";
            console.log("sendDataTwilio");
            var url = "http://mummy.mybluemix.net/email?name=Fadi&subject=" + subject + "&time=" + time;
            httpGet(url);
        }
    }

    //SEND FLIGHTS DATA
    for (var i = 0; i < flightslist.length; i++) {
        var time = flightslist[i].time;
        var location = flightslist[i].location;
        console.log("sendDataTwilio");
        var url = "mummy.mybluemix.net/flight?name=Fadi&time=" + time + "&geo=" + location;
        httpGet(url);
    }
};
