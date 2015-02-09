var canvas;
var canvasWidth = 750;
var canvasHeight = 750;
var dia1 = 590;
var dia2 = 480;
var dia3 = 370;
var dia4 = 260;
var rhythm1 = [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0];
var rhythm2 = [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0];
var rhythm3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var rhythm4 = [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0];
var tempo;
var tempoMs;
var playing = false;
var beat;
//var tempoSlider;
//var swingSlider;
var volume, volumeSlider;

var slices;
//var slicesSlider;


var hat1,kick1,snare1,tamb1;
var hat2,kick2,snare2,tamb2;
var hat3,kick3,snare3,tamb3;
var hat,kick,snare,tamb;
var tapOn;
var beatMs;
var lastVal;
var current;
var reverb;
var reverbAmt;


function setup(){
	reverb = new p5.Reverb();
	reverbAmt = 0;
	hat1 = preload('/anm2/sf/03hhclosed_acoustic.wav');
	kick1 = preload('/anm2/sf/KICK_05H.wav');
	snare1 = preload('/anm2/sf/02snare_acoustic.wav');
	tamb1 = preload('/anm2/sf/06ride_acoustic.wav');
	hat2 = preload('/anm2/sf/03hhclosed_hip-hop.wav');
	kick2 = preload('/anm2/sf/01kick_hip-hop.wav');
	snare2 = preload('/anm2/sf/02snare_hip-hop.wav');
	tamb2 = preload('/anm2/sf/06ride_hip-hop.wav');
	hat3 = preload('/anm2/sf/04hhopen_techno.wav');
	kick3 = preload('/anm2/sf/KICK_14H.wav');
	snare3 = preload('/anm2/sf/02snare_techno.wav');
	tamb3 = preload('/anm2/sf/05clap_techno.wav');

	
	canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.position(300,10);
	tempo = 90;
	tempoMs = 30000/tempo;
	beat = -1;
	
	
	tapOn = false;

	beatMs = 30000/tempo;
	slices = 8;
	acoustic();
	lastVal = 0;
	bootsNcats();
	document.getElementById("reverb").value = 0;	
}


function draw(){
//	slices = sliceSlider.value();
	slices = document.getElementById("slices").value;	
	console.log(beat);
	
	
	volume = document.getElementById("volume").value/100 ;
	masterVolume(volume);
	
	if(lastVal != document.getElementById('tempo').value){
	tempo = document.getElementById('tempo').value;
	}
	beatMs = 30000/tempo;
	lastVal = document.getElementById('tempo').value;
	background(100);
	noStroke();
	fill(230,180,120);
	ellipse(canvasWidth/2,canvasWidth/2, 740,740);
	fill(255,50,50);
	ellipse(canvasWidth/2,canvasWidth/2, 710,710);
	fill(255,255,0);
	ellipse(canvasWidth/2,canvasWidth/2, 670,670);
	stroke();
	var swing;
	//ellipse(canvasWidth/2,canvasWidth/2, dia1, dia1);
	//ellipse(canvasWidth/2,canvasWidth/2, dia2, dia2);
	//ellipse(canvasWidth/2,canvasWidth/2, dia3, dia3);
	//ellipse(canvasWidth/2,canvasWidth/2, dia4, dia4);
	
	updatePepperonis(beat);
	
	if(beat%2==0){
		swing = beatMs*(document.getElementById("swing").value)*.01;
	}
	else{
		swing = -beatMs*(document.getElementById("swing").value)*.01;
		
	}
	if(millis()> tempoMs + swing){
		beat++;
		if (beat > slices)
		beat = 0;
		
	tempoMs = (30000/tempo) + millis();
		if (beat == slices)
		beat = 0;
		
		playBeats(beat);
	
	}
	
	
	
		
	

}


function mousePressed(){
	
	for(var i = 0; i < slices; i++){
		var d = dist(mouseX, mouseY, canvasWidth/2 + (dia1/2) * cos((-PI/2)+i*(PI/(slices/2))), canvasWidth/2 + (dia1/2) * sin((-PI/2)+i*(PI/(slices/2))));
		if (d < 17){
			if(rhythm1[i] == 0){
			rhythm1[i] = 1;
			}
			else{
			rhythm1[i] = 0;
			}
		} 
		var d = dist(mouseX, mouseY, canvasWidth/2 + (dia2/2) * cos((-PI/2)+i*(PI/(slices/2))), canvasWidth/2 + (dia2/2) * sin((-PI/2)+i*(PI/(slices/2))));
		if (d < 17){
			if(rhythm2[i] == 0){
			rhythm2[i] = 1;
			}
			else{
			rhythm2[i] = 0;
			}
		} 
		var d = dist(mouseX, mouseY, canvasWidth/2 + (dia3/2) * cos((-PI/2)+i*(PI/(slices/2))), canvasWidth/2 + (dia3/2) * sin((-PI/2)+i*(PI/(slices/2))));
		if (d < 17){
			if(rhythm3[i] == 0){
			rhythm3[i] = 1;
			}
			else{
			rhythm3[i] = 0;
			}
		} 
		var d = dist(mouseX, mouseY, canvasWidth/2 + (dia4/2) * cos((-PI/2)+i*(PI/(slices/2))), canvasWidth/2 + (dia4/2) * sin((-PI/2)+i*(PI/(slices/2))));
		if (d < 17){
			if(rhythm4[i] == 0){
			rhythm4[i] = 1;
			}
			else{
			rhythm4[i] = 0;
			}
		} 
	}
		
}

function updatePepperonis(beat){
	//console.log("made it");
	for(var i = 0; i < slices; i ++){
	//console.log("made it2");
		if (i == beat){
			var rad = 50;
		}
		else var rad = 30;
				
		if(rhythm1[i] == 0){
			fill(255,235,0);
			noStroke();
		}
		else{
			fill(255,50,50);
			noStroke();
		}
				
		ellipse(canvasWidth/2 + (dia1/2) * cos((-PI/2)+i*PI/(slices/2)), canvasWidth/2 + (dia1/2) * sin((-PI/2)+i*PI/(slices/2) ) ,rad, rad);
		
		if(rhythm2[i] == 0){
			fill(255,235,0);
			noStroke()
		}
		else{
			fill(255,50,50);
			noStroke();
		}
		
		ellipse(canvasWidth/2 + (dia2/2) * cos((-PI/2)+i*PI/(slices/2)), canvasWidth/2 + (dia2/2) * sin((-PI/2)+i*PI/(slices/2)),rad, rad);
		if(rhythm3[i] == 0){
			fill(255,235,0);
			noStroke();
		}
		else{
			fill(255,50,50);
			noStroke();
		}
		
		ellipse(canvasWidth/2 + (dia3/2) * cos((-PI/2)+i*PI/(slices/2)), canvasWidth/2 + (dia3/2) * sin((-PI/2)+i*PI/(slices/2)),rad, rad);
		if(rhythm4[i] == 0){
			fill(255,235,0);
			noStroke();
		}
		else{
			fill(255,50,50);
			noStroke();
		}
		ellipse(canvasWidth/2 + (dia4/2) * cos((-PI/2)+i*PI/(slices/2)), canvasWidth/2 + (dia4/2) * sin((-PI/2)+i*PI/(slices/2)),rad, rad);

	
	}

	
}

function playBeats(beat){
	if(rhythm1[beat] == 1){
	playSound(kick);
	
	}
	if(rhythm2[beat] == 1){
	playSound(snare);
	
	

	}
	if(rhythm3[beat] == 1){
	playSound(tamb);
	
	

	}
	if(rhythm4[beat] == 1){
	playSound(hat);
	
	}

}

function reset(){
	
	
	
rhythm1 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
rhythm2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
rhythm3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
rhythm4 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


	
	
}

function acoustic(){
	hat = hat1
	kick = kick1
	snare = snare1
	tamb = tamb1
}


function hiphop(){
	hat = hat2
	kick = kick2
	snare = snare2
	tamb = tamb2
}


function electronic(){
	hat = hat2
	kick = kick3
	snare = snare3
	tamb = tamb3
	}
	
function tap(){
	if (tapOn == false){
	tapUp()
	tapOn = true;
	}
	else{
	tapDown()
	tapOn = false;
	}
	
}
function tapUp(){ 
	current = millis();
	//console.log(current);
	
	
	}
	
function tapDown(){
	var diff = millis() - current;
	newTempo = (30000.0/diff)*2;
	document.getElementById("tempo").value = newTempo;
//	console.log(newTempo);
	
}

	



function levee(){
rhythm1 = [1,1,0,0,0,0,0,1,0,0,1,1,0,0,0,0];
rhythm2 = [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0];
rhythm3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
rhythm4 = [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0];		
document.getElementById("slices").value = 16;	
document.getElementById("tempo").value = 138;
document.getElementById("swing").value = 8;
acoustic();	
document.getElementById("reverb").value = 100;

}

function bootsNcats(){
rhythm1 = [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0];
rhythm2 = [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0];
rhythm3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
rhythm4 = [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0];
document.getElementById("slices").value = 8;	
document.getElementById("tempo").value = 200;
document.getElementById("swing").value = 0;
	
}


function uhnTiss(){
rhythm1 = [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0];
rhythm2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
rhythm3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
rhythm4 = [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0];
document.getElementById("slices").value = 16;	
document.getElementById("tempo").value = 266;
document.getElementById("swing").value = 25;
hiphop();
	
}

function randomSet(){

	for (var i = 0; i < 16; i++){
		rhythm1[i] = random(1);
		rhythm2[i] = random(1);
		rhythm3[i] = random(1);
		rhythm4[i] = random(1);		
	}
	
	for (var i = 0; i < 16; i++){
		if (rhythm1[i] > .6){
			rhythm1[i] = 1;
		}
		else rhythm1[i] = 0;
		
		if (rhythm2[i] > .6){
			rhythm2[i] = 1;
		}
		else rhythm2[i] = 0;
		
		if (rhythm3[i] > .6){
			rhythm3[i] = 1;
		}
		else rhythm3[i] = 0;
		
		if (rhythm4[i] > .6){
			rhythm4[i] = 1;
		}
		else rhythm4[i] = 0;	
	}
	document.getElementById("slices").value = random(2,16);	
	document.getElementById("tempo").value = random(80, 300);
	document.getElementById("swing").value = random(50);
	console.log("random");
	
}

function playSound(soundfile){
	reverbAmt = document.getElementById("reverb").value/50.0;
	reverb.process(soundfile, 2.4, 1.5);	
	reverb.amp(reverbAmt);
	soundfile.play();
	
	
}


