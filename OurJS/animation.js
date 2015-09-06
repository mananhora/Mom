//GLOBAL VARIABLES
var moveRight = document.querySelectorAll('ajaxChange');
var toggleSwitch = document.getElementById('toggle');
var pathFill = document.getElementById('pathFill');
var circleMov = document.getElementById('circleMov');

//TOGGLE SWITCH ANIMATION
toggleSwitch.onclick = function () {
	var mov_animation = new TimelineMax({
		yoyo: true
	});

	mov_animation.to(pathFill, 0.1, {
		fill: '#6cbddd',
		ease: Elastic.easeInOut
	});
};
