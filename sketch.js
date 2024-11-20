let charli;
let logo;

let l = 800;
let w = 800;

let wMod = w/6;
let lMod = l/6;

const Y_AXIS = 1;
const X_AXIS = 2;

let color1;
let color2;

let tSize = 40;

var mode;

var header;

var story;


function preload(){
  charli = loadImage('charlibbs.JPG');
  logo = loadImage('birthdaylogowhite.png');
  color1 = color(255);
  color2 = color(0);
	
  mode = 'noImage';
}

function setup() {
  createCanvas(w,l);
}

function draw() {
  
  if (mode == 'noImage'){
	  
  }else if(mode =='image'){
	setBackgroundImage(charli);
  
  	setGradient(0,l-(l/3),w,l/3,color1,color2,Y_AXIS); 
  
  	placeLogo(logo);
  
  	writeHeader(header);
  	writeStory(story);
  }
  
}

function setBackgroundImage(img){
  image(img,0,0,w,l);
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  blendMode(MULTIPLY);
  
  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
  
  blendMode(BLEND);
  
}

function placeLogo(img){
  
  wPos = w - wMod;
  lPos = l - lMod + l/40;
  
  image(img,wPos,lPos,wMod,lMod);
  
}

function writeHeader(txt){
  
  
  textFont('Helvetica');
  textStyle(BOLD);
  textSize(tSize);
  textAlign(CENTER);
  fill(color1);
  noStroke();
  
  
  
  text('['+txt+']',w/2,l*(12/16));
}

function writeStory(txt){
  textFont('Helvetica');
  textStyle(BOLD);
  textSize(tSize);
  textAlign(CENTER);
  fill(color1);
  noStroke();
  
  text(txt,w/2,l*(13/16));
  
}

function receiveForm(event){
	
	event.preventDefault();
	
	header = document.getElementById('header').value;
	
	story = document.getElementById('caption').value;
	
	mode = 'image';
	
}