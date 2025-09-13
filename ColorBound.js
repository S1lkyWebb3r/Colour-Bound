//Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
//Player:
let x = 410;
let y = 560;
const size = 15;
const speed = 5;
let color = "white"

//Quadrants
let quadrants = [];
const quadSize = 50;
const rows = Math.floor(canvas.height / quadSize);
const cols = Math.floor(canvas.width / quadSize);

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    quadrants.push({
      x: col * quadSize,
      y: row * quadSize,
      size: quadSize,
      color: "red" // default
    });
  }
}

//Color Picker:
// helper function to get a square by row/col
function getQuadrant(row, col) {
  return quadrants[row * cols + col];
}

// Hand-pick colors
getQuadrant(0, 0).color = "yellow";   // top-left
getQuadrant(2, 3).color = "blue";     // row 2, col 3
getQuadrant(5, 7).color = "green";    // row 5, col 7
getQuadrant(8, 8).color = "white";
getQuadrant(8, 7).color = "white";
getQuadrant(8, 6).color = "white";
getQuadrant(8, 5).color = "white";
getQuadrant(8, 4).color = "white";
getQuadrant(9, 8).color = "white";
getQuadrant(10, 8).color = "white";
getQuadrant(11, 8).color = "white";


//Gamestate (playing, paused, dead, starting)
let gameState = "playing"; //change this later
//Keys
const keys = {};
document.addEventListener("keydown", (e) => keys[e.code] = true);
document.addEventListener("keyup", (e) => keys[e.code] = false);

//Collision code:
function isColliding(x, y, size, objX, objY, objSize) {
  return x < objX + objSize && x + size > objX && y < objY + objSize && y + size > objY;
}

//Update function
function update() {
    if (gameState !== "playing") return

    if (keys["ArrowUp"]) y += -speed;
    if (keys["ArrowDown"]) y += speed;
    if (keys["ArrowLeft"]) x += -speed;
    if (keys["ArrowRight"]) x += speed;

    //Death check:
    for (let q of quadrants) {
        if (color !== q.color){
            if (isColliding(x, y, size, q.x, q.y, q.size)) {
                x = 410;
                y = 410;
                color = "white"
            }
        }
    }
}

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);

    //Quadrants
    for (let q of quadrants) {
        ctx.fillStyle = q.color;
        ctx.fillRect(q.x, q.y, q.size, q.size);
    }
    
    //player 
    if (gameState !== "dead"){
        ctx.fillStyle = color;
        ctx.fillRect(x, y, size, size);

        ctx.strokeStyle = "black";      // Outline color
        ctx.lineWidth = 2;              // Outline thickness (optional)
        ctx.strokeRect(x, y, size - 2, size - 2); // Draw outline
    }
}

// Game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();