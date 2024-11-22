//import { pushData } from "./awsIntegration";

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

var pic;

var can;

var saveable;



function preload(){
  charli = loadImage('charlibbs.JPG');
  logo = loadImage('birthdaylogowhite.png');
  color1 = color(255);
  color2 = color(0);
	
  mode = 'noImage';
	
  saveable = false;
}

function setup() {
  can = createCanvas(w,l);
}

function draw() {
  
  if (mode == 'noImage'){
	  
  }else if(mode =='image'){
	setBackgroundImage(pic);
  
  	setGradient(0,l-(l/3),w,l/3,color1,color2,Y_AXIS); 
  
  	placeLogo(logo);
  
  	writeHeader(header);
  	writeStory(story);
	  
	saveable = true;
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
function convertHEICToJPEG(file, callback) {
    heic2any({
        blob: file,
        toType: "image/jpeg",
        quality: 0.8 // Adjust quality (0 to 1)
    })
        .then((convertedBlob) => {
            const reader = new FileReader();
            reader.onload = function (event) {
                callback(event.target.result); // Pass the JPEG data URL to the callback
            };
            reader.readAsDataURL(convertedBlob);
        })
        .catch((error) => {
            console.error("Error converting HEIC to JPEG:", error);
        });
}



function receiveForm(event) {
    event.preventDefault();

    header = document.getElementById('header').value;
    story = document.getElementById('caption').value.toUpperCase();

    const file = document.getElementById('picture').files[0];

    if (file) {
        // Check if the uploaded file is a HEIC image
        if (file.type === 'image/heic') {
            console.log("HEIC image detected, converting to JPEG...");
            convertHEICToJPEG(file, (jpegDataURL) => {
                loadImage(jpegDataURL, function (loaded) {
                    pic = loaded;
                    mode = 'image';

                    setTimeout(() => {
                        if (saveable) {
                            saveCanvasToRemoteServer();
                        }
                    }, 1000);

                    sendPic();
                });
            });
        } else {
            // Process non-HEIC images as before
            const reader = new FileReader();
            reader.onload = function (event) {
                loadImage(event.target.result, function (loaded) {
                    pic = loaded;
                    mode = 'image';

                    setTimeout(() => {
                        if (saveable) {
                            saveCanvasToRemoteServer();
                        }
                    }, 1000);

                    sendPic();
                });
            };
            reader.readAsDataURL(file);
        }
    }

    paparazzo = document.getElementById("paparazzo").value;
    celebrity = document.getElementById("celebrity").value;
    pushData(paparazzo, celebrity);
}


async function pushData(paparazzo, celebrity){
    const url = "https://upmfm7yzu2.execute-api.us-east-1.amazonaws.com/publish_to_birthdae?" + new URLSearchParams({
        paparazzo: paparazzo,
        celebrity: celebrity,
    });
    const response = await fetch(url, {
        method: "POST"
    })
}



function saveCanvasToRemoteServer() {
  console.log('sending');
  const canvas = document.getElementById('defaultCanvas0'); // Get the canvas element
  canvas.toBlob((blob) => {
    const formData = new FormData();
    formData.append('image', blob, generateName());

    fetch('https://luxury-piroshki-67e7b8.netlify.app/api/save-image', { // Replace with your server endpoint
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Image upload failed');
      }
      console.log('Image uploaded successfully');
    })
    .catch(error => {
      console.error('Error uploading image:', error);
    });
  });
}


function generateName(){
	var picname = document.getElementById("header").value.substring(0,4) + getRandomInt(1000).toString() + ".png";
	
	console.log(picname);
	
	return picname;
	
}


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}