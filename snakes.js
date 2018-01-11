//snakes game

//game loop - init, draw, update, gameover

function init(){
	canvas = document.getElementById('mycanvas');
	pen = canvas.getContext('2d');			
	W = canvas.width;
	H = canvas.height;
	score = 0;
	game_over = false;
	food = getRandomFood();
	snake = {
		init_length:5,
		color:"pink",
		cells: [],
		direction:"right",

		createSnake: function(){
			for (var i = this.init_length-1; i>=0 ; i--) {
				this.cells.push({x:i,y:1});
				
			}
		},

		drawSnake: function(){
			for (let i = 0; i < this.cells.length; i++) {
				pen.fillStyle = this.color;
				pen.strokeStyle = "black";
				pen.lineWidth = 3;
				//console.log(i)
				
				pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
				pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
			}
		},

		updateSnake: function(){
		
			var headX = this.cells[0].x;
			//(headX,headY) = (4,0)
			var headY = this.cells[0].y;

			//newHeadX = headX + 1;
			if (headX == food.x && headY == food.y){
				food = getRandomFood();
				score++;
			}else{
				this.cells.pop();
			}

			if(snake.direction =="right"){
				nextX =  headX + 1;
				nextY = headY ;
			}
			else if(snake.direction =="left"){
				nextX =  headX - 1;
				nextY = headY ;
			}
			else if(snake.direction =="down"){
				nextX =  headX ;
				nextY = headY + 1;
			}
			else if(snake.direction =="up"){
				nextX =  headX ;
				nextY = headY - 1;
			}
			
			this.cells.unshift({x:nextX,y:nextY});

			//boundary co-ordinates
			last_x = Math.round(W/10);
			last_y = Math.round(H/10);

			if(this.cells[0].x < 0 || this.cells[0].y < 0 ||
				this.cells[0].x >last_x ||this.cells[0].y >last_y){
				alert("game over");
				game_over = true;
			}			

		}
	};
	snake.createSnake();

	//add event listener to our game

	function keypressed(e){
	/*	console.log("pressed a key");
		console.log(e);*/

		if (e.key == "ArrowRight"){
			snake.direction = "right";
		}
		else if(e.key == "ArrowDown"){
			snake.direction = "down";
		}
		else if(e.key == "ArrowUp"){
			snake.direction = "up";
		}
		else if(e.key == "ArrowLeft"){
			snake.direction = "left";
		}
		
	}

	document.addEventListener('keydown', keypressed);

}

function draw(){
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	//food
	pen.fillStyle = food.color;
	pen.fillRect(food.x*10,food.y*10,10,10);

	//score
	pen.fillStyle = "white";
	pen.font = "14 Times New Roman";
	pen.fillText("Score "+ score,10,10);
}

function update(){
	snake.updateSnake();
}

function gameloop(){
	draw();
	update();

	if(game_over == true){
		clearInterval(f);
	}
}

function getRandomFood(){
	let foodX = Math.round(Math.random()*(W-10)/10);
	let foodY = Math.round(Math.random()*(H-10)/10);
	let foodColors = ["red","yellow","orange","green"];
	let i = Math.floor(Math.random()*foodColors.length); 

	var food = {
		x:foodX,
		y:foodY,
		color: foodColors[i],
	};

	return food;
}

init();
var f = setInterval(gameloop,200);