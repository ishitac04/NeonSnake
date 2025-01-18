const board=document.getElementById('gameboard')
const instructiontext=document.getElementById('instructiontext')
const logo = document.getElementById('Logo')
const score = document.getElementById('currentscore')
const highScoreText = document.getElementById('highscore')

const gridSize = 20;
let snake=[{x: 10, y: 10}];
let food= generateFood();
let direction = "right";
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false
let highScore = 0


function draw() {
    board.innerHTML='';
    //resets the gameboard at the start of new game
    drawsnake();
    drawFood();
    updateScore();
} 

function drawsnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });
}

function createGameElement(tag, className) {
    const element=document.createElement(tag);
    element.className = className;
    return element;
}

function setPosition(element, position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;

}

draw();

function drawFood() {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

function generateFood() {
    const x = Math.floor((Math.random() * gridSize) + 1);
    const y = Math.floor((Math.random() * gridSize) + 1);
    return { x, y };
}

function move(){
    const head = {...snake[0]}
    switch(direction) {
        case 'right':
            head.x++;
            break;
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head. x--;
            break;
    }

    snake.unshift(head);
    //snake.pop(); //destroys the last block as the new block is created
    
    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            move();
            checkCollision();
            draw();
        }, gameSpeedDelay);
    }
    else {
        snake.pop();
    }
}

function startGame() {
    gameStarted = true
    instructiontext.style.display = 'none';
    logo.style.display = 'none';  
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw();
    }, gameSpeedDelay);
}

function handleKeyPress(event) {
    if (
        (!gameStarted && event.code === 'Space') ||
        (!gameStarted && event.key === ' ')
    ) {
        startGame();
    } else {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up'
                break
            case 'ArrowDown':
                direction = 'down'
                break
            case 'ArrowRight':
                direction = 'right'
                break
            case 'ArrowLeft':
                direction = 'left'
                break
        }
    }
}
 
document.addEventListener('keydown', handleKeyPress);

function increaseSpeed() {
    if (gameSpeedDelay > 150) {
        gameSpeedDelay -= 150
} 
    else if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 3;
}
    else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 2;
    }
    else if (gameSpeedDelay > 25) {
        gameSpeedDelay -= 1;
    }
}

function checkCollision() {
    const head = snake[0];

    if( head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y)
            resetGame();
    }
}

function resetGame() {
    snake = [{x: 10, y: 10}]
    food = generateFood();
    direction = 'right';
    gameSpeedDelay = 200;
    updateScore();
}

function updateScore() {
    const scoreNow = snake.length - 1;
    score.textContent = scoreNow.toString().padStart(3,'0');
} // change the padstart value to see what it does 

function stopGame() {
    clearInterval(gameInterval);
    gameStarted = false;
    instructiontext.style.display = 'block';
    logo.style.display = 'block';
}

function updateHighScore() {
    const scoreNow = snake.length - 1;
    if (scoreNow > highScore) {
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3, '0');
    }

    highScoreText.style.display = 'block';
}