//import { getData } from "./awsIntegration";

var mode;
var players;

function startTimer(duration,display){
	var timer = duration;
	
	setInterval(function(){
		
		display.textContent = timer;
		
		
		//taking too long to deploy
		if(--timer < 0){
			
			updateBoard();
			timer = duration;
		}
		
	},1000);
	
}

window.onload = function(){
	var display = document.getElementById('countdown');
	startTimer(10,display);
	mode = "clout"
	players = [];
	
	modeSwitch();
	updateBoard();
		
	
}

async function getData(){
    const response = await fetch('https://h0fkejytf5.execute-api.us-east-1.amazonaws.com/get_birthdae_rankings');
    const data = response.json();
    return data;
}



async function updateBoard(){
	players = [];
	
	const data = await getData();
	
	for(let i = 0; i < data.data.length; i++){
		var temp = data.data[i];
		players[i] = new Player(temp.player_name,temp.posts_submitted,temp.appearances);
	}
	
	
	
	if(mode == "clout"){
		sortClout();
	}else if(mode == "credit"){
		sortCredit();
	}
	
	
	
	clearTable();
	
	for(i in players){
		insertRow(players[i]);
	}
	
}

function modeSwitch(){
	
	if(mode == "clout"){
		document.getElementById("people").textContent = "CELEBS";
		document.getElementById("stories").textContent = "STORIES WRITTEN";
		document.getElementById("roles").textContent = "STARRING ROLES";
		document.getElementById("clout").textContent = "ADJUSTED CLOUT VALUE";
		
	}else if(mode == "credit"){
		document.getElementById("people").textContent = "CITIZENS";
		document.getElementById("stories").textContent = "INCIDENTS REPORTED";
		document.getElementById("roles").textContent = "INFRACTIONS";
		document.getElementById("clout").textContent = "SOCIAL CREDIT SCORE";
	}
}


function sortClout(){
	players.sort(function(a,b){
		return b.clout - a.clout;
	});
}

function sortCredit(){
	players.sort(function(a,b){
		return b.socialCredit - a.socialCredit;
	});
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

