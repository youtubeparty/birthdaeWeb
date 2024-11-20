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

function Player(id,postsSubmitted,postsAbout){
	this.name = id;
	this.storiesWritten = postsSubmitted;
	this.starringRoles = postsAbout;
	this.clout = 100*(postsSubmitted+postsAbout)+parseInt(Math.random(100));
	this.socialCredit=function(){
		var initvalue = 10*(postsSubmitted*(2*postsAbout));
		if (initvalue < 0){
			initvalue = initvalue - parseInt(Math.random(10));
		}else{
			initvalue = initvalue + parseInt(Math.random(10));
		}
		return initvalue;
	}
	
	console.log('got here');
	console.log(this.name);
	console.log(this.storiesWritten);
	console.log(this.starringRoles);
	console.log(this.clout);
	console.log(this.socialCredit);
		
}