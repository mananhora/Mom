var emailList = []; //to store emails from last two days and send data to Twilio

var email = function(replyTime, subject, name) { //EMAIL CLASS
    this.replyTime = replyTime;
    this.subject = subject;
    this.name = name;
};


function listMessages() { //gets list of gmail messages 
    // console.log("client id  " + CLIENT_ID);
    userId = "horamanan@gmail.com"; //gets the email inputted by the user

    //QUERY PARAMETERS TO GET EMAILS FROM LAST TWO DAYS
    var d = new Date(); //get current date
    var n = d.getDate();
    n = n - 2;
    var messagequery = "after:2015/09/0"+n;

    var getPageOfMessages = function(request, result) {
        request.execute(function(resp) {
            result = result.concat(resp.messages);

            for (var i = 0; i < resp.messages.length; i++) {
                //messages list = resp.messages
                var id = resp.messages[i].id;
                getMessage(userId, id, callback);
            }

            var nextPageToken = resp.nextPageToken;
            if (nextPageToken) {
                request = gapi.client.gmail.users.messages.list({
                    'userId': userId,
                    'pageToken': nextPageToken,
                    'q': messagequery
                });
                getPageOfMessages(request, result);
            } else {
                console.log(emailList.length);

                console.log("error");

            }
        });
    };
    var initialRequest = gapi.client.gmail.users.messages.list({
        'userId': userId,
        'q': messagequery
    });
    getPageOfMessages(initialRequest, []);
}


/**
 * Get Message with given ID.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} messageId ID of Message to get.
 * @param  {Function} callback Function to call when the request is complete.
 */



function getMessage(userId, messageId, callback) { //get message-takes in email id (userId) and messageId
    var request = gapi.client.gmail.users.messages.get({
        'userId': userId,
        'id': messageId
    });
    request.execute(callback);
}

var callback = function(data) { //callback function for getMessage()
    console.log(data.result.snippet);
    var snippet = data.result.snippet;
    var replyTime = null;
    var name = null; //get name from google..
    var message = new email(replyTime, snippet, name);
    emailList.push(message);
}

function printList() {
    // console.log("emailList  " + emailList);
    for(var i = 0; i<emailList.length;i++){
        // console.log(emailList[i].subject);
        $('#emails_list').append('<li>'+emailList[i].subject+'</li>');
    }

    //FOR TESTING-keep until finished
    emailList[0].replyTime="tomorrow";
    emailList[1].replyTime="day after tomorrow";
}
