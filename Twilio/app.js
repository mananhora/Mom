/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

var express = require('express');
var twilio = require('twilio');

var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);

var app = express();

app.use(express.static(__dirname + '/public'));

var vcapServices = process.env.VCAP_SERVICES;
var services = JSON.parse(vcapServices);
var credentials = services['user-provided'][0].credentials;
var userSID = credentials.accountSID;
var authToken = credentials.authToken;


	var accountSid = 'AC1a733ffe3a0874651c8670c7fa71d923';
	var authToken = "8e98ba217be6b99bb974486cd3efd0a0";
	var client = require('twilio')(accountSid, authToken);




//Texts for flights
app.get('/flight', function (req, res) {
	
  var name = req.query.name;
  var time = req.query.time;
  var geo = req.query.geo; 
	
	
	client.messages.create({ 
         to: '+12269275775',
         from: '+12262715574',      
	body: "Hi " + name + " You have a flight leaving at " +time+ " from " +geo +". Dont be late, \nLove Mom.  ",   
	}, function(err, message) {
		if (err) {
//			process.stdout.write(JSON.stringify(err, null, 2));
			process.stdout.write(JSON.stringify(err, null, 2));
			console.log('failed to send message');
		}
		else {
//	    process.stdout.write(message.sid);
	    process.stdout.write(message.sid);
	    console.log('message sent');
	    
//	    
//  			process.stdout.write('setting up client');
  			process.stdout.write('setting up client');
  			
  			
 //	    		for flights
  				process.stdout.write('setting up client');
   			    setTimeout(function () {
				process.stdout.write('in set interval');
				client.calls.create({ 
					to: "+12269275775", 
					from: "+12262715574", 
					url: "http://mummy.mybluemix.net/callingnumbersflight.xml",  
					method: "GET",  
					fallbackMethod: "GET",  
					statusCallbackMethod: "GET",    
					record: "false" 
				}, function(err, call) { 
					console.log(call.sid); 
				});
			}, 15000);//end of call
  			
  			
  			
  			
  			
  			
  			
//	
	  }
	});
});





//Texts for Meetings (all 5 params)
app.get('/meetings', function (req, res) {
	
  var name = req.query.name;
  var member = req.query.member;
  var time = req.query.time;
  var geo = req.query.geo; 
	
	
	
	if (typeof member === 'undefined'){
		
			client.messages.create({ 
         to: '+12269275775',
         from: '+12262715574',      
	body: "Hi " + name + ", you have a meeting at " +time+ " in " +geo +". Dont be late, \nLove Mom. ",   
	}, function(err, message) {
		if (err) {
//			process.stdout.write(JSON.stringify(err, null, 2));
			process.stdout.write(JSON.stringify(err, null, 2));
			console.log('failed to send message');
		}
		else {
	    process.stdout.write(message.sid);
	    process.stdout.write(message.sid);
	    console.log('message sent');
  			process.stdout.write('setting up client');


//	    		for meetings
  				process.stdout.write('setting up client');
   			    setTimeout(function () {
				process.stdout.write('in set interval');
				client.calls.create({ 
					to: "+12269275775", 
					from: "+12262715574", 
					url: "http://mummy.mybluemix.net/callingnumbersmeeting.xml",  
					method: "GET",  
					fallbackMethod: "GET",  
					statusCallbackMethod: "GET",    
					record: "false" 
				}, function(err, call) { 
					console.log(call.sid); 
				});
			}, 15000);//end of call





	  			}
			});
		}
		
	//if we have all 4 params
	else{
 
	client.messages.create({ 
         to: '+12269275775',
         from: '+12262715574',      
	body: "Hi " + name + ", you have a meeting with " +member+" at " +time+ " in " +geo +". Dont be late, \nLove Mom. ",   
	}, function(err, message) {
		if (err) {
//			process.stdout.write(JSON.stringify(err, null, 2));
			process.stdout.write(JSON.stringify(err, null, 2));
			console.log('failed to send message');
		}
		else {
	    process.stdout.write(message.sid);
	    process.stdout.write(message.sid);
	    console.log('message sent');
  			process.stdout.write('setting up client');

//	    		for meetings
  				process.stdout.write('setting up client');
   			    setTimeout(function () {
				process.stdout.write('in set interval');
				client.calls.create({ 
					to: "+12269275775", 
					from: "+12262715574", 
					url: "http://mummy.mybluemix.net/callingnumbersmeeting.xml",  
					method: "GET",  
					fallbackMethod: "GET",  
					statusCallbackMethod: "GET",    
					record: "false" 
				}, function(err, call) { 
					console.log(call.sid); 
				});
			}, 15000);//end of call






	  			}
			});
		};//if for desc undefined 
	


});



app.get('/email', function (req, res) {
	
  var name = req.query.name;
  var time = req.query.time;
  var subject = req.query.subject; 
	
	client.messages.create({ 
         to: '+12269275775',
         from: '+12262715574',      
	body: "Hi " + name + ", don't forget to reply to your '" +subject+ "' email by " +time+". Dont be late, \nLove Mom. ",   
	}, function(err, message) {
		if (err) {
//			process.stdout.write(JSON.stringify(err, null, 2));
			process.stdout.write(JSON.stringify(err, null, 2));
			console.log('failed to send message');
		}
		else {
//	    process.stdout.write(message.sid);
	    process.stdout.write(message.sid);
	    console.log('message sent');
	    
//	    		for emails
  				process.stdout.write('setting up client');
   			    setTimeout(function () {
				process.stdout.write('in set interval');
				client.calls.create({ 
					to: "+12269275775", 
					from: "+12262715574", 
					url: "http://mummy.mybluemix.net/callingnumbers.xml",  
					method: "GET",  
					fallbackMethod: "GET",  
					statusCallbackMethod: "GET",    
					record: "false" 
				}, function(err, call) { 
					console.log(call.sid); 
				});
			}, 15000);//End of call
  			
  				
  			
  			
//	
	  }
	});
});




app.listen(port, host, function() {
  console.log("server starting on " + host);
});

