var canvas;
var canvasWidth = 400;
var canvasHeight = 400;
var blockLen = 10;

var gridHeight = canvasWidth / blockLen;
var gridWidth = canvasHeight / blockLen;

var player;
var fruit;
var grid = [];

var fr = 15;

function updateGrid(x, y, val) {
	grid[x][y] = val;
}

function setup() {
	canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent("#canvas_container");
	canvas.background('black');

	for(let i = 0; i < canvasWidth/10; i++) {
		let gridRow = [];
		for(let j = 0; j < canvasHeight/10; j++) {
			gridRow.push(0);
		}
		grid.push(gridRow);
	}
	console.log(grid);

	player = new Snake(blockLen, gridHeight, gridWidth);
	fruit = new Fruit(gridHeight, gridWidth);
	updateGrid(player.x, player.y, 1); // 1 == player
	updateGrid(fruit.x, fruit.y, 2); // 2 == fruit
	frameRate(fr);
}

function keyPressed(value) {
	switch(value.key) {
		case "w": player.direction = 1; break;
		case "a": player.direction = 3; break;
		case "s": player.direction = 2; break;
		case "d": player.direction = 0; break;
	}
}

function draw() {
	clear();

	updateGrid(player.x, player.y, 0);
	player.move();
	console.log(player.x, player.y, fruit.x, fruit.y);
	if(player.x == fruit.x && player.y == fruit.y) {
		player.babies.push([-1,-1]);
		fruit = new Fruit(gridHeight, gridWidth);
	}
	updateGrid(player.x, player.y, 1);

	for(let i = 0; i < player.babies.length; i++) {
		if(player.x == player.babies[i][0] && player.y == player.babies[i][1]) {
			alert("game over");
			noLoop();
			clear();
		}
	}

	for(let i = 0; i < grid.length; i++) {
		for(let j = 0; j < grid[i].length; j++) {
			fill('black');
			stroke('#454545');
			rect(i*blockLen, j*blockLen, blockLen, blockLen);
		}
	}
	fill('lightgreen')
	stroke('green');
	rect(player.x * blockLen, player.y* blockLen, blockLen, blockLen);
	for(let i = 0; i < player.babies.length; i++) {
		rect(player.babies[i][0] * blockLen, player.babies[i][1] * blockLen, blockLen, blockLen);
	}

	stroke('red');
	fill('pink');
	rect(fruit.x * blockLen, fruit.y * blockLen, blockLen, blockLen);
}