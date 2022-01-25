const OCTAVES = 6;
const LACUNARITY = 2.;
const GAIN = .5;

var t;


function Smooth(t){
  return t * t * t * (t * (t * 6- 15) + 10);
}
function fBm( p, freq, amp) {
  
  var val = 0;
  for ( i = 0; i < OCTAVES; i++){
    val += amp * noise(p * freq);
    freq *= LACUNARITY;
    amp *= GAIN;
  }
  
  return val;
}

var depth = 40;
var waveNodes = 100;
var waveHeight;

function setup() {
  createCanvas(850,450);
  waveHeight = height/5;
  background(0,50,50);
  
  stroke(255);
  
}

function draw() {
  background(0,20,40);
  fill(255);
  
  ellipse (width*.8, height*.1,50,50);
  
  fill(0,20,40);
  noStroke();
  ellipse (width*.782, height*.1,35,35);
  
  stroke(255);
  for(var z = 0; z < height; z+= 4*depth/height ){
    fill(20,30,(z/depth)*170);
    beginShape();
    
    var buffer = width*.2 * ((depth-z)/depth);
    vertex(buffer,1000);
      //remember this stupid line for the future
    var lineWidth = (width-buffer) - buffer*(1-(z/depth));
    for( var x = 0; 
        x < lineWidth ;
        x += lineWidth/waveNodes){
      vertex(x+buffer, 
             height/depth + height/z + noise(x*.01+frameCount*.005,z-frameCount*.0075) * waveHeight + 10*z);
    }
    vertex(width-buffer, 1000);
    endShape();
  }
  
}
