//GLOBAL VARIABLES
var moveRight = document.querySelectorAll('div.ajaxChange');
var centerFold = document.getElementById('centerFold');
var toggleSwitch = document.getElementById('toggle');
var pathFill = document.getElementById('pathFill');
var circleMov = document.getElementById('circleMov');

//TOGGLE SWITCH ANIMATION 
jQuery(document).ready(function() {
	console.log('0');
	toggleSwitch.onclick = function () {
		var mov_animation = new TimelineMax({
			yoyo: true
		});

		mov_animation.to(pathFill, 1, {
			fill: '#6cbddd',
			// ease: Elastic.easeInOut
		})
		.to(circleMov, 0.5, {
			css: {
				x: 38
			},
			// ease: Elastic.easeInOut
		})
		//Reverse animation
		toggleSwitch.onclick = function() {
			if (mov_animation.reversed()) {
				mov_animation.play();
			} else {
				mov_animation.reverse();
			}
		};

		// Ajax calling
		// var toLoad = $(this).attr('href') + moveRight;
		// $(moveRight).hide('fast', loadContent);
		// $(moveRight).remove();
		// $('#ajaxAdd').fadeIn('normal');
		// function loadContent() {
		// 	$(moveRight).load("reminder.html")
		// }
		// loadContent();
		// $.ajax({url: "http://localhost:8000/Documents/PennApps/Mom/reminder.html", success: function(result) {
		// 	$(moveRight).html(result);
		// 	console.log(result);
		// 	console.log("its working");
		// }})
		console.log('1');
		// function showNewContent() {
		// 	$('#centerFold').add();
		// }
		console.log('2');
		// return false;

	};
	console.log('3');
});



