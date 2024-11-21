import { getData, pushData } from "./awsIntegration";

var mode;

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
	mode = "clout"
	
	var t1 = new Player("fart",2,3);
	var t2 = new Player("Shir",4,5);
	insertRow(t1);
	
	clearTable();
	
	insertRow(t2);
	
	
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
		
}

function insertRow(character){
	var table = document.getElementById("ranking");
	
	var newRow = table.insertRow();
	newRow.className = "player";
	
	var nameCell = newRow.insertCell();
	nameCell.className = "name";
	nameCell.textContent = character.name;
	
	
	var writtenCell = newRow.insertCell();
	writtenCell.className = "written";
	writtenCell.textContent = character.storiesWritten;
	
	var aboutCell = newRow.insertCell();
	aboutCell.className = "about";
	aboutCell.textContent = character.starringRoles;
	
	var scoreCell = newRow.insertCell();
		scoreCell.className = "score";
	if(mode == "clout"){
		scoreCell.textContent = character.clout;
	}else if(mode == "credit"){
		scoreCell.textContent = character.socialCredit;
	}
}

function clearTable(){
	var tb = document.getElementById("ranking");
	while(tb.rows.length > 1){
		tb.deleteRow(1);
	}
	
}

function onSubmit(){
	paparazzo = document.getElementById("paparazzo").value;
	celebrity = document.getElementById("celebrity").value;
	pushData(paparazzo, celebrity);
}