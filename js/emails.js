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
    var messagequery = "after:2015/09/0" + n;

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
                // console.log(emailList.length);

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
    for (var i = 0; i < emailList.length; i++) {
        // console.log(emailList[i].subject);
        $('#emails_list').append('<li>' + emailList[i].subject + '</li>');
        $('#replyBtns').append('<ul class="inline-list"> <li> <a href="#"> <svg version="1.1" id="reply" class="reply" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 31 36" enable-background="new 0 0 31 36" xml:space="preserve"> <path fill="#CDCDCD" d="M13.9,19.4c0,1.9,0,3.7,0,5.9c-4.7-3.6-9.2-7-13.9-10.5C4.6,11,9.1,7.4,13.8,3.6c0,2.1,0,4,0,6 c1.6,0,3.2,0,4.7,0c6.2-0.2,11.1,3.6,12.2,9.4c1.2,6.1-2.9,12.3-9,13.4c2.2-3,2.7-6.1,0.8-9.3C20.7,19.8,17.6,18.9,13.9,19.4z"/> </svg> </a> </li><li> <a href="#" data-reveal-id="remindModal"> <svg version="1.1" id="replyReminder" class="replyReminder" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 31 38" enable-background="new 0 0 31 38" xml:space="preserve"> <g> <path fill="#CBCBCB" d="M15.5,35.4c-8.3,0-15.1-6.8-15.1-15.1c0-8.3,6.8-15.1,15.1-15.1s15.1,6.8,15.1,15.1 C30.6,28.6,23.8,35.4,15.5,35.4z M15.5,8.2c-6.6,0-12,5.4-12,12s5.4,12,12,12c6.6,0,12-5.4,12-12S22.1,8.2,15.5,8.2z"/> </g> <g> <rect x="13.9" y="2.1" fill="#CBCBCB" width="3.1" height="4.6"/> </g> <g> <path fill="#CBCBCB" d="M19.1,3.6h-7.3c-0.9,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5h7.3c0.9,0,1.5,0.7,1.5,1.5S20,3.6,19.1,3.6z"/> </g> <g> <path fill="#CBCBCB" d="M4.3,36.6c-0.3,0-0.6-0.1-0.9-0.3c-0.7-0.5-0.9-1.5-0.4-2.1l2.9-4c0.5-0.7,1.5-0.9,2.1-0.4 c0.7,0.5,0.9,1.5,0.4,2.1l-2.9,4C5.3,36.3,4.8,36.6,4.3,36.6z"/> </g> <g> <path fill="#CBCBCB" d="M26.8,36.6c-0.5,0-1-0.2-1.3-0.6l-2.9-4c-0.5-0.7-0.3-1.7,0.4-2.1c0.7-0.5,1.7-0.3,2.1,0.4l2.9,4 c0.5,0.7,0.3,1.7-0.4,2.1C27.4,36.5,27.1,36.6,26.8,36.6z"/> </g> <g> <path fill="#CBCBCB" d="M27.7,9.6L24.9,7c-0.8-0.7-0.8-2-0.1-2.8l0,0c0.7-0.8,2-0.8,2.8-0.1l2.8,2.7c0.8,0.7,0.8,2,0.1,2.8l0,0 C29.7,10.3,28.5,10.4,27.7,9.6z"/> </g> <g> <path fill="#CBCBCB" d="M3.3,9.6L6.1,7c0.8-0.7,0.8-2,0.1-2.8l0,0c-0.7-0.8-2-0.8-2.8-0.1L0.6,6.8c-0.8,0.7-0.8,2-0.1,2.8l0,0 C1.3,10.3,2.5,10.4,3.3,9.6z"/> </g> <g> <path fill="#CBCBCB" d="M14.6,21.1c0,1,0,2.1,0,3.3c-2.6-2-5.1-3.9-7.7-5.8c2.6-2.1,5.1-4.1,7.7-6.2c0,1.2,0,2.2,0,3.3 c0.9,0,1.8,0,2.6,0c3.4-0.1,6.2,2,6.8,5.2c0.7,3.4-1.6,6.8-5,7.4c1.2-1.7,1.5-3.4,0.4-5.2C18.4,21.3,16.7,20.8,14.6,21.1z"/> </g> </svg> </a> </li></ul>');
    }

    //FOR TESTING-keep until finished
    emailList[0].replyTime = "2pm tomorrow";
    emailList[1].replyTime = "3pmday after tomorrow";
    emailList[2].replyTime = "4pm today"
    emailList[3].replyTime = "8pm tomorrow";
}



