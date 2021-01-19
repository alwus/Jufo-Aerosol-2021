var grid;
var nextGrid = [];

var waveButton;
var doppelspalt1Button;
var doppelspalt2Button;

function setup() {

  createWave();

  waveButton = createButton("Welle");
  waveButton.mouseClicked(createWave);
  doppelspalt1Button = createButton("Doppelspalt 1");
  doppelspalt1Button.mouseClicked(doppelspalt1);
  doppelspalt2Button = createButton("Doppelspalt 2");
  doppelspalt2Button.mouseClicked(doppelspalt2);

  nextGrid = arrayClone(grid);
}

function draw() {
  background(255);
  render();
  check();
}

function check() {
  nextGrid = arrayClone(grid);

  let e = frameCount%2; //e is one for uneven frames -> shifted blocks  for margolus-neighbourhood

  for(let i = e; i < width/2-e; i++) {
    for(let j = e; j < height/2-e; j++) {
      //for uneven frames the first and last rows are not checked because 2*2 block placement is not possible

      let block = [];
      // [0][1]
      // [2][3]
      block[0] = grid[i*2-e][j*2-e];
      block[1] = grid[i*2-e][j*2+1-e];
      block[2] = grid[i*2+1-e][j*2-e];
      block[3] = grid[i*2+1-e][j*2+1-e];

      switch(count(block)) {
        case 10:
          break;
        case 0:
          break;
        case 1:
        //every cell takes the value of the opposing cell
        nextGrid[i*2-e][j*2-e] = block[3];
        nextGrid[i*2-e][j*2+1-e] = block[2];
        nextGrid[i*2+1-e][j*2-e] = block[1];
        nextGrid[i*2+1-e][j*2+1-e] = block[0];
          break;
        case 2:
        //every cell switches its value
          nextGrid[i*2-e][j*2-e] = !block[0];
          nextGrid[i*2-e][j*2+1-e] = !block[1];
          nextGrid[i*2+1-e][j*2-e] = !block[2];
          nextGrid[i*2+1-e][j*2+1-e] = !block[3];
          break;
        case 3:
        //every cell takes the value of the opposing cell
        nextGrid[i*2-e][j*2-e] = block[3];
        nextGrid[i*2-e][j*2+1-e] = block[2];
        nextGrid[i*2+1-e][j*2-e] = block[1];
        nextGrid[i*2+1-e][j*2+1-e] = block[0];
          break;
        case 4:
          break;
      }
    }
  }
  grid = arrayClone(nextGrid);
}

function render() {
  for(let i in grid){
    for(let j in grid[i]){
      if(grid[i][j] == 0){
        stroke(255);
      }else if(grid[i][j] == 1){
        stroke(0);
      }else if(grid[i][j] == 2){
        stroke(255,0,0);
      }
      point(i,j);
    }
  }
}

function count(arr) { //count how many true cells are in one block
  let c = 0;
  for(i of arr) {
    if(i == 1) {
      c++;
    } else if(i == 2) {
      return 10;
    }
  }
  return c;
}

function arrayClone( arr ) {

    let i, copy;

    if( Array.isArray( arr ) ) {
        copy = arr.slice( 0 );
        for( i = 0; i < copy.length; i++ ) {
            copy[ i ] = arrayClone( copy[ i ] );
        }
        return copy;
    } else if( typeof arr === 'object' ) {
        throw 'Cannot clone array containing an object!';
    } else {
        return arr;
    }

}

function fillRandom() {
  for (let i = 0; i < width-2; i++){
    for(let j = 0; j < height-2; j++){
      grid[i][j] = random([1, 0]);
    }
  }
}

function createWave() {
  createCanvas(200, 200);
  grid = new Array(width);
  for (let i = 0; i < width; i++){
    grid[i] = new Array(height);
    for(let j = 0; j < height; j++){
      grid[i][j] = 0;
    }
  }
  fillRandom();
  for (let i = 80; i < 120; i++){
    for(let j = 80; j < 120; j++){
      grid[i][j] = 1;
    }
  }
}

function doppelspalt1() {
  createCanvas(400, 200);
  grid = new Array(width);
  for (let i = 0; i < width; i++){
    grid[i] = new Array(height);
    for(let j = 0; j < height; j++){
      grid[i][j] = 0;
    }
  }
  fillRandom();

  for (let i = width/2-2; i < width/2; i++){
    for(let j = 0; j < (height-2)/2-30; j++){
      grid[i][j] = 2;
    }
    for(let j = (height-2)/2-20; j < (height-2)/2+20; j++){
      grid[i][j] = 2;
    }
    for(let j = (height-2)/2+30; j < height-2; j++){
      grid[i][j] = 2;
    }
  }


  for (let i = 75; i < 125; i++){
    for(let j = 75; j < 125; j++){
      grid[i][j] = 1;
    }
  }
}

function doppelspalt2() {
  createCanvas(400, 200);
  grid = new Array(width);
  for (let i = 0; i < width; i++){
    grid[i] = new Array(height);
    for(let j = 0; j < height; j++){
      grid[i][j] = 0;
    }
  }
  fillRandom();

  for (let i = width/2-2; i < width/2; i++){
    for(let j = 0; j < (height-2)/2-60; j++){
      grid[i][j] = 2;
    }
    for(let j = (height-2)/2-20; j < (height-2)/2+20; j++){
      grid[i][j] = 2;
    }
    for(let j = (height-2)/2+60; j < height-2; j++){
      grid[i][j] = 2;
    }
  }


  for (let i = 75; i < 125; i++){
    for(let j = 75; j < 125; j++){
      grid[i][j] = 1;
    }
  }
}
