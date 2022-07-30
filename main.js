song="";
leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;
score_left_wrist=0;
score_wrist_wrist = 0;

function preload()
{
  song=loadSound("music.mp3");
}
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);
}

function modelLoaded()
{
    console.log("Model Is Initialized !");
}

function gotPoses(results)
{
 if(results.length > 0)
 {
    console.log(results);
    leftwristX=results[0].pose.leftWrist.x;
    leftwristY=results[0].pose.leftWrist.y;
    console.log("Left Wrist X ="+leftwristX+"Left Wrist Y ="+leftwristY);

    rightwristX=results[0].pose.rightWrist.x;
    rightwristY=results[0].pose.rightWrist.y;
    console.log("Right Wrist X ="+rightwristX+"Right Wrist Y ="+rightwristY);

    score_left_wrist=results[0].pose.keypoints[9].score;
    console.log("Left Wrist Score ="+score_left_wrist);

    score_right_wrist = results[0].pose.keypoints[10].score;
    console.log("Right Wrist Score ="+score_right_wrist);
 }
}

function draw()
{
    image(video,0,0,600,500);
    fill("#ff0000");
    stroke("#00FF00");

    
    if(score_right_wrist > 0.2)
    {
        circle(rightwristX,rightwristY,20);

        if(rightwristY >= 0 && rightwristY <= 100){
            document.getElementById("speed").innerHTML="Speed = 0.5x"
            song.rate(0.5);
        }

       else if(rightwristY >= 100 && rightwristY <= 200){
            document.getElementById("speed").innerHTML="Speed = 1x"
            song.rate(1);  
        }

        else if(rightwristY >= 200 && rightwristY <= 300){
            document.getElementById("speed").innerHTML="Speed = 1.5x"
            song.rate(1.5);
    }

    else if(rightwristY >= 300 && rightwristY <= 400){
        document.getElementById("speed").innerHTML="Speed = 2x"
        song.rate(2);
    }
     
    else if(rightwristY >= 400 && rightwristY <= 500){
        document.getElementById("speed").innerHTML="Speed = 2.5x"
        song.rate(2.5);
    }
    }    

    if(score_left_wrist > 0.2)
    {
        circle(leftwristX,leftwristY,20);
        inNumberLW=Number(leftwristY);
        remove_decimal=floor(inNumberLW);
        volume=remove_decimal/500;
        document.getElementById("volume").innerHTML="Volume ="+volume;
        song.setVolume(volume);
    }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}