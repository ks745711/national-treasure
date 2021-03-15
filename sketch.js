const key = 'pk.eyJ1Ijoia3M3NDU3MTEiLCJhIjoiY2ttMHN6d3g0MG8yODJ1cjN3aTliM2w5OSJ9.pIeKrHmzxU5EMvYL5cBZ6Q';

const options = {
  lat: 39.8283,
  lng: -98.5795,
  zoom: 3,
  style: 'mapbox://styles/ks745711/ckm8lapr11g5k18o5l5toysx3',
  pitch: 0
};

const mappa = new Mappa('MapboxGL', key);
let myMap;
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  locations = loadTable('National_Treasure.csv', 'csv', 'header');
  img = createImg('https://www.usnews.com/dims4/USNEWS/bb996bf/17177859217/thumbnail/256x256/quality/85/?url=https%3A%2F%2Fmedia.beam.usnews.com%2F8d%2F8f3c53319d560b2f4139af68c9a77c%2Fcollege-photo_28775.jpg')
  img.hide();
}


function draw() {
  clear();
  //noFill();
  stroke(255);
  const zoom = myMap.zoom();





  for (let i = 0; i < locations.getRowCount(); i++) {
    // Get the lat/lng of each locations 
    const latitude = Number(locations.getString(i, 'reclat'));
    const longitude = Number(locations.getString(i, 'reclong'));
    const position = myMap.latLngToPixel(latitude, longitude);

    const scene = locations.getString(i, 'scene');
    const movielocation = locations.getString(i, 'movielocation');
    const reallocation = locations.getString(i, 'reallocation');
    const realaddress = locations.getString(i, 'realaddress');



    if (dist(position.x, position.y, mouseX, mouseY) < (zoom * 3.5) / 2) {

      fill(0, 128, 129);
      rect(position.x, position.y, 450, 150);
      fill(255);
      noStroke();
      textAlign(LEFT);
      textFont('Roboto');
      textSize(22);
      textSize(16);
      text('Movie location: ' + movielocation, position.x + 10, position.y + 20, 430);
      text('Real location: ' + reallocation, position.x + 10, position.y + 40, 430);
      text('Address: ' + realaddress, position.x + 10, position.y + 60, 430);
      text('Scene: ' + scene, position.x + 10, position.y + 100, 430);
      fill(255);


    } else {
      fill(255, 200);
    }
    strokeWeight(2);
    stroke(0, 128, 129);
    ellipse(position.x, position.y, 3.5 * zoom, 3.5 * zoom);
    fill(0, 128, 129);
    noStroke();
    
    if (zoom>4){
    textFont('Beth Ellen');
    textSize(3.5 * zoom-15);
    textAlign(CENTER, CENTER);
    text(i+1, position.x, position.y+1);
  }

  }
  fill(127,107,77);
  rect(0,0,windowWidth,70);
  rect(0,windowHeight-40,windowWidth,40);
  
  fill(255);
  textFont('Beth Ellen');
  textAlign(CENTER, CENTER);
  textSize(30);
  text('National Treasure Filming Locations', windowWidth/2, 39)
  textSize(12);
  text('Data from movie-locations.com', windowWidth/2, windowHeight-17)

}

$(window).bind('resize', function(e) {
  if (window.RT) clearTimeout(window.RT);
  window.RT = setTimeout(function() {
    this.location.reload(false); /* false to get page from cache */
  }, 200);
});
