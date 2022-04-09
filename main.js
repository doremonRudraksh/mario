nose_x = 0;
nose_y = 0;
mario_x = 325;
mario_y = 325;
img = "";

function preload() {
	world_start = loadSound("world_start.wav");
	mario_kick = loadSound("kick.wav");
	mario_jump = loadSound("jump.wav");
	mario_die = loadSound("mariodie.wav")
	game_over = loadSound("gameover.wav");
	mario_coin = loadSound("coin.wav");

	setSprites();
	MarioAnimation();
	
	img  = loadImage("imgs/mario/mario05.png");

}

function setup() {
	canvas = createCanvas(1240,336);
	canvas.parent("canvas");
	video = createCapture(VIDEO);
	video.size(800, 400);
	video.parent("gameConsole");
	
	instializeInSetup(mario);

	posenet  = ml5.poseNet(video, modelLoaded);
	posenet.on("pose", gotPoses);

	
}

function draw() {
	game()
	background("#d3d3d3");
	// their is an imaginary line in the center of the video at 300px //
	// first if is for moving the mario left //
	
	if(nose_x <300){
		mario_x = mario_x-1;
	}
	 // second if is for moving mario right //
	if(nose_x >300){
		mario_x = mario_x+1;
	}
	// third if is for moving the mario up //
	if(nose_y < 150){
		mario_y = mario_y-1
	}


	image(img ,mario_x ,mario_y ,40 ,70);
}

function modelLoaded(){
	console.log("model is Intialized");
}

function gotPoses(results){
	console.log(results);
	if(results.length > 0){
		nose_x = results[0].pose.nose.x;
		nose_y = results[0].pose.nose.y;
		console.log("Nose X = " + nose_x + "Nose Y = " + nose_y);
	}
}






