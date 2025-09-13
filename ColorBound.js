//Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let x = 400;
let y = 400;
const size = 15;
const speed = 5;
let color = "white"
//Quadrants
let quadrants = [
    {x: 0, y: 0, size: 60, color: "red"}
]

//Gamestate (playing, paused, dead, starting)
let gameState = "starting";
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
    if (keys["ArrowUp"]) x += speed;

    //Death check:
    for (let q of quadrants) {
        if (color === q.color){
            if (isColliding(x, y, size, q.x, q.y, q.size)) {
                gamestate = "dead"
            }
        }
    }
}

function draw() {
    ctx.clearRect(0,0, canvas.Width, canvas.height);

    //player 
    if (gameState !== "dead"){
        ctx.fillStyle = color;
        ctx.fillRect(x, y, size, size);

        ctx.strokeStyle = "black";      // Outline color
        ctx.lineWidth = 2;              // Outline thickness (optional)
        ctx.strokeRect(x, y, size - 2, size - 2); // Draw outline
    }
    for (let q of quadrants) {
        ctx.fillStyle = q.color;
        ctx.fillRect(q.x, q.y, q.size, q.size);
    }
}

// Game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();