var emailList; //to store emails from last ten days and send data to Twilio

var email = function(replyTime, subject, name) {
    this.replyTime = replyTime;
    this.subject = subject;
    this.name = name;
};

function sendDataTwilio(){
	for(var i = 0; i<emailList.length;i++){
		email = emailList[i];
		if(email.replyTime!=null){
			//send get request to Twilio..
		}
	}
};


