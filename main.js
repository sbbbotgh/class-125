noseX = 0;
noseY = 0;
rightWristX = 0;
leftWristX = 0;
difference = 0;


function setup(){
    video = createCapture(VIDEO);
    video.size(550,500);

    canvas = createCanvas(550, 550);
    canvas.position(610,150);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    background('#555');
    document.getElementById("square_side").innerHTML = "Size of the square = "+difference+"px";
    fill('red');
    stroke('red');
    square(noseX,noseY,difference);
}

function modelLoaded(){
    console.log("poseNET is working now");
}

function gotPoses(results){
    if(results.length > 0){
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("nose x = "+noseX+", nose y = "+noseY);
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);
        console.log(difference);
        console.log("left Wrist x = "+ leftWristX +", right Wrist x = " +rightWristX+".  Difference = " + difference);
    }
}