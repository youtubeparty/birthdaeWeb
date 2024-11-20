function startTimer(duration,display){
	var timer = duration;
	
	setInterval(function(){
		
		display.textContent = timer;
		
		if(--timer < 0){
			timer = duration;
		}else{
			startTimer(60,display)
		}
		
	},1000);
	
}

window.onload = function(){
	var display = document.getElementById('countdown');
	startTimer(60,display);	
}