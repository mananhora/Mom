var emailList; //to store emails from last ten days and send data to Twilio

var email = function(replyTime, subject, name) {
    this.replyTime = replyTime;
    this.subject = subject;
    this.name = name;
};

function sendDataTwilio() {
    for (var i = 0; i < emailList.length; i++) {
        email = emailList[i];
        if (email.replyTime != null) {
            //send get request to Twilio..
        }
    }
};



// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '408469176032-2i4t8vgtgr3l0khfkv69v9djcc6g9hea.apps.googleusercontent.com';

var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

/**
 * Check if current user has authorized this application.
 */

function checkAuth() {
    gapi.auth.authorize({
        'client_id': CLIENT_ID,
        'scope': SCOPES,
        'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
        // Hide auth UI, then load client library.
        authorizeDiv.style.display = 'none';
        loadGmailApi();
    } else {
        // Show auth UI, allowing the user to initiate authorization by
        // clicking authorize button.
        authorizeDiv.style.display = 'inline';
    }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
    gapi.auth.authorize({
            client_id: CLIENT_ID,
            scope: SCOPES,
            immediate: false
        },
        handleAuthResult);
    return false;
}

/**
 * Load Gmail API client library. List labels once client library
 * is loaded.
 */
function loadGmailApi() {
    gapi.client.load('gmail', 'v1', listLabels);
}

/**
 * Print all Labels in the authorized user's inbox. If no labels
 * are found an appropriate message is printed.
 */
function listLabels() {
    var request = gapi.client.gmail.users.labels.list({
        'userId': 'me'
    });

    request.execute(function(resp) {
        var labels = resp.labels;
        appendPre('Labels:');

        if (labels && labels.length > 0) {
            for (i = 0; i < labels.length; i++) {
                var label = labels[i];
                appendPre(label.name)

            }
        } else {
            appendPre('No Labels found.');
        }

    });
}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('output');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);

}


/**
 * Retrieve Messages in user's mailbox matching query.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} query String used to filter the Messages listed.
 * @param  {Function} callback Function to call when the request is complete.
 */

var callback = function(data) {
    // if (data) {
    //     console.log(data);
    //     return;
    // }
    //data = JSON.parse(data);
    console.log(data.result.snippet);
}

function listMessages() { //gets list of gmail messages 
    // console.log("client id  " + CLIENT_ID);
    userId = $('#emailid').val(); //gets the email inputted by the user

    //QUERY PARAMETERS TO GET EMAILS FROM LAST TWO DAYS
    var d = new Date(); //get current date
    var n = d.getDate();
    n = n - 2;
    query = "after:2015/09/03";

    var getPageOfMessages = function(request, result) {
        request.execute(function(resp) {
            result = result.concat(resp.messages);

            for (var i = 0; i < resp.messages.length; i++) {
                console.log("message" + resp.messages[i]);
                var id = resp.messages[i].id;
                console.log(id + " id");

                getMessage(userId, id, callback);
            }

            console.log(result.length + " result");
            var nextPageToken = resp.nextPageToken;
            if (nextPageToken) {
                request = gapi.client.gmail.users.messages.list({
                    'userId': userId,
                    'pageToken': nextPageToken,
                    'q': query
                });
                getPageOfMessages(request, result);
            } else {
                console.log("error");

            }
        });
    };
    var initialRequest = gapi.client.gmail.users.messages.list({
        'userId': userId,
        'q': query
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



function getMessage(userId, messageId, callback) {
    var request = gapi.client.gmail.users.messages.get({
        'userId': userId,
        'id': messageId
    });
    var response = request.execute(callback);
    // console.log("request " + request);
    // console.log("response  " + response);
    // console.log("callback done");

}
