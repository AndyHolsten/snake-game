const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const easyBtn = document.getElementById('easyBtn');
const mediumBtn = document.getElementById('mediumBtn');
const hardBtn = document.getElementById('hardBtn');
const startScreen = document.getElementById('startScreen');
const startBtn = document.getElementById('startBtn');

const eatSound = new Audio('eat.mp3');
const gameOverSound = new Audio('game_over.mp3');

// Set the canvas dimensions
canvas.width = 400;
canvas.height = 400;

// Define the size of each grid cell
const gridSize = 20;
let gameSpeed = localStorage.getItem('gameSpeed') || 100; // milliseconds for the game loop interval
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
highScoreElement.innerHTML = `High Score: ${highScore}`;

let gameStarted = false;
let paused = false;

function updateSelectedButton() {
    // Remove selected class from all buttons
    easyBtn.classList.remove('selected');
    mediumBtn.classList.remove('selected');
    hardBtn.classList.remove('selected');

    // Add selected class to the correct button
    if (gameSpeed == 150) {
        easyBtn.classList.add('selected');
    } else if (gameSpeed == 100) {
        mediumBtn.classList.add('selected');
    } else if (gameSpeed == 50) {
        hardBtn.classList.add('selected');
    }
}

// Define the initial snake
// The snake is an array of segments, each with x and y coordinates on the grid
let snake = [
    { x: 10, y: 10 }, // head
    { x: 9, y: 10 },
    { x: 8, y: 10 }
];
let foodX;
let foodY;

// Snake's velocity in grid units
let dx = 1; // move 1 grid cell to the right per frame
let dy = 0; // no vertical movement
let changingDirection = false; // Prevents multiple direction changes in one frame

// Listen for keyboard events to change the snake's direction
document.addEventListener("keydown", changeDirection);

startBtn.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameStarted = true;
    createFood();
    gameLoop();
});

easyBtn.addEventListener('click', () => {
    localStorage.setItem('gameSpeed', 150);
    gameSpeed = 150;
    updateSelectedButton();
});

mediumBtn.addEventListener('click', () => {
    localStorage.setItem('gameSpeed', 100);
    gameSpeed = 100;
    updateSelectedButton();
});

hardBtn.addEventListener('click', () => {
    localStorage.setItem('gameSpeed', 50);
    gameSpeed = 50;
    updateSelectedButton();
});

// Main game loop function
function gameLoop() {
    if (paused) {
        // If paused, don't run the game loop, but check again after a delay
        setTimeout(gameLoop, 100);
        return;
    }
    // Using setTimeout ensures that there's a minimum delay between frames,
    // which is a safer way to create a game loop than setInterval.
    setTimeout(function() {
        if (isGameOver()) {
            gameOverSound.play();
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('highScore', highScore);
                highScoreElement.innerHTML = `High Score: ${highScore}`;
            }
            ctx.fillStyle = 'black';
            ctx.font = '50px Arial';
            ctx.fillText('Game Over', canvas.width / 4, canvas.height / 2);
            return; // Stop the game
        }
        changingDirection = false; // Reset the flag at the start of the loop
        drawBoard();
        drawFood();
        moveSnake();
        drawSnake();

        // Call gameLoop again to continue the animation
        gameLoop();
    }, gameSpeed);
}

function drawBoard() {
    // Set background to lightblue to clear the old frame
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }
    ctx.strokeStyle = '#ddd';
    ctx.stroke();
}

function moveSnake() {
    // Calculate the new head position based on the current velocity
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    // Add the new head to the front of the snake
    snake.unshift(head);

    const hasEatenFood = snake[0].x === foodX && snake[0].y === foodY;
    if (hasEatenFood) {
        // Increase score
        score += 10;
        // Display score on screen
        scoreElement.innerHTML = 'Score: ' + score;
        // Generate new food location
        createFood();
        eatSound.play();
    } else {
        // Remove the tail segment to make the snake move
        snake.pop();
    }
}

function createFood() {
    // Generate a random x and y coordinate for the food
    foodX = Math.floor(Math.random() * (canvas.width / gridSize));
    foodY = Math.floor(Math.random() * (canvas.height / gridSize));

    // If the new food location is where the snake currently is,
    // generate a new food location
    snake.forEach(function isFoodOnSnake(part) {
        if (part.x === foodX && part.y === foodY) {
            createFood();
        }
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'darkred';
    ctx.fillRect(foodX * gridSize, foodY * gridSize, gridSize, gridSize);
    ctx.strokeRect(foodX * gridSize, foodY * gridSize, gridSize, gridSize);
}

function changeDirection(event) {
    // If a direction change is already in progress for this frame, ignore.
    if (changingDirection) return;
    changingDirection = true;

    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    // Change direction based on key press, preventing the snake from reversing
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -1;
        dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -1;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 1;
        dy = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 1;
    }

    if (event.key === 'p' || event.key === 'P') {
        togglePause();
    }
}

// Function to draw a single snake segment
function drawSnakePart(snakePart) {
    ctx.fillStyle = 'purple'; // The user wants a purple snake
    ctx.strokeStyle = '#551A8B'; // A darker purple for the border
    // The position on the canvas is the grid coordinate * gridSize
    ctx.fillRect(snakePart.x * gridSize, snakePart.y * gridSize, gridSize, gridSize);
    ctx.strokeRect(snakePart.x * gridSize, snakePart.y * gridSize, gridSize, gridSize);
}

// Function to draw the entire snake
function drawSnake() {
    snake.forEach(drawSnakePart);
}

function isGameOver() {
    // Check for collision with the wall
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > canvas.width / gridSize - 1;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > canvas.height / gridSize - 1;

    if (hitLeftWall || hitRightWall || hitTopWall || hitBottomWall) {
        return true;
    }

    // Check for collision with the snake's own body
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    return false;
}

function togglePause() {
    paused = !paused;
    if (!paused) {
        gameLoop(); // Resume the game loop
    }
}

document.addEventListener('keydown', function(event) {
    if (isGameOver() && gameStarted) {
        // Allow restarting the game by pressing any key
        document.location.reload();
    }
});

updateSelectedButton(); 