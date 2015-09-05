//SEND DATA TO TWILIO

function httpGet(theUrl) { 
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function sendDataTwilio() { 
    for (var i = 0; i < emailList.length; i++) {
        email = emailList[i];//get email
        if (email.replyTime != null) { //if the replyTime has been set by the user.
            //send data to twilio...
            var subject = email.subject;
            var time = email.replyTime;
            var name = "Manan";
            console.log("sendDataTwilio");

            // var url = "mummy.mybluemix.net/email?name=" + name + "&subject=" + subject + "&time=" + time;
            //"http://mummy.mybluemix.net/email?name=Fadi%26subject=cancel+adult+magazine+subscription%26time=tomorrow"
            
            // "http://mummy.mybluemix.net/email?name=Fadi&subject=cancel+adult+magazine+subscription&time=tomorrow"
            var url = "http://mummy.mybluemix.net/email?name=Fadi&subject="+subject+"&time="+time;
            httpGet(url);
        }
    }
};












