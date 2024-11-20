function startTimer(duration,display){
	var timer = duration;
	
	setInterval(function(){
		
		display.textContent = timer;
		
		
		//taking too long to deploy
		if(--timer < 0){
			timer = duration;
		}
		
	},1000);
	
}

window.onload = function(){
	var display = document.getElementById('countdown');
	startTimer(60,display);	
	var template = new Player('ted',3,4);
	
	
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getSocialCredit(pS,pA){
	var initvalue = 10*(pS-(2*pA));
		if (initvalue < 0){
			initvalue = initvalue - getRandomInt(10);
		}else{
			initvalue = initvalue + getRandomInt(10);
		}
		return initvalue;
}

function Player(id,postsSubmitted,postsAbout){
	this.name = id;
	this.storiesWritten = postsSubmitted;
	this.starringRoles = postsAbout;
	this.clout = 100*(postsSubmitted+postsAbout)+getRandomInt(100);
	this.socialCredit=getSocialCredit(postsSubmitted,postsAbout);
		
	
	
	console.log('got here');
	console.log(this.name);
	console.log(this.storiesWritten);
	console.log(this.starringRoles);
	console.log(this.clout);
	console.log(this.socialCredit);
		
}