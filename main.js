let canvas = document.querySelector("#snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, 
    y: Math.floor(Math.random() * 15 + 1) * box
}
let points = document.querySelector("#score");

//Cria área do jogo
function createbg() {
    context.fillStyle = "#2C4001";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//Cria cobra
function createsnake() {
    for(let i = 0; i < snake.length; i++) {
        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//Cria comida para a cobra
function createfood() {
    context.fillStyle = "white";
    context.fillRect(food.x, food.y, box, box);
}

//Contabiliza pontuação
function scored() {
    points.innerHTML = snake.length - 1;
}

//Chama a função quando key é pressionada
document.addEventListener("keydown", update);

//Direções
function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

//Inicia jogo
function newgame() {
    createbg();
    createsnake();
    createfood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Direções
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "down") snakeY += box;
    if(direction == "up") snakeY -= box;

    let newhead = {
        x: snakeX,
        y: snakeY
    }

    //Insere os valores no inicio da array, neste caso a cabeça da cobra
    snake.unshift(newhead);

    //Atravessa os lados do quadrado
    if(snake[0].x > 15 * box && direction == 'right') snake[0].x = 0
    if(snake[0].x > 15 * box && direction == 'up') snake[0].x = 0
    if(snake[0].x > 15 * box && direction == 'down') snake[0].x = 0

    if(snake[0].x < 0  && direction == 'left') snake[0].x = 15 * box
    if(snake[0].x < 0  && direction == 'up') snake[0].x = 15 * box
    if(snake[0].x < 0  && direction == 'down') snake[0].x = 15 * box

    if(snake[0].y > 15 * box && direction == 'down') snake[0].y = 0
    if(snake[0].y > 15 * box && direction == 'right') snake[0].y = 0
    if(snake[0].y > 15 * box && direction == 'left') snake[0].y = 0

    if(snake[0].y < 0 && direction == 'up') snake[0].y = 15 * box
    if(snake[0].y < 0 && direction == 'right') snake[0].y = 15 * box
    if(snake[0].y < 0 && direction == 'left') snake[0].y = 15 * box

    //Comer comida, gerar nova comida e pontuar
    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        scored();
    }

    //Verificar se a cobra bateu nela mesmo e não contar como pontuação
    for(let i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            scored();
            clearInterval(game);
            alert("Game Over!");
        }
    }
}

let game = setInterval(newgame, 100);