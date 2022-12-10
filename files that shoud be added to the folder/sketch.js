let angle=0,txture,obj;
var leftBuffer;
var rightBuffer,pose;
let dis=0;
var st=false;

function gotPoses(poses)
{
	// console.log(poses);
	if(poses.length>0)
	{
		pose=poses[0].pose;
		skeleton=poses[0].skeleton;
	}
}

function modelLoaded()
{
	console.log('poseNet loaded');
}


function setup() {
	let canvas2 = createCanvas(600, 400);
	canvas2.position(600,0);
	video=createCapture(VIDEO);
	video.hide();
	canvas2.hide();
	setTimeout(function()
	{
		poseNet=ml5.poseNet(video,modelLoaded);
		poseNet.on('pose',gotPoses);
		st=true;
	},1000);
}

function draw(){
	if(st)
	{
  	image(video,0,0);
		if(pose)
		{
			let shoulderR=pose.rightShoulder;
			let shoulderL=pose.leftShoulder;
			document.cookie = "noseX="+pose.nose.x+",";
			document.cookie += "noseY="+pose.nose.y+",";

			document.cookie += "leftEyeX="+pose.leftEye.x+",";
			document.cookie += "leftEyeY="+pose.leftEye.y+",";

			document.cookie += "rightEyeX="+pose.rightEye.x+",";
			document.cookie += "rightEyeY="+pose.rightEye.y+",";

			document.cookie += "leftEarX="+pose.leftEar.x+",";
			document.cookie += "leftEarY="+pose.leftEar.y+",";

			document.cookie += "rightEarX="+pose.rightEar.x+",";
			document.cookie += "rightEarY="+pose.rightEar.y+",";

			document.cookie += "leftShoulderX="+pose.leftShoulder.x+",";
			document.cookie += "leftShoulderY="+pose.leftShoulder.y+",";

			document.cookie += "rightShoulderX="+pose.rightShoulder.x+",";
			document.cookie += "rightShoulderY="+pose.rightShoulder.y+",";

			document.cookie += "leftElbowX="+pose.leftElbow.x+",";
			document.cookie += "leftElbowY="+pose.leftElbow.y+",";

			document.cookie += "rightElbowX="+pose.rightElbow.x+",";
			document.cookie += "rightElbowY="+pose.rightElbow.y+",";

			document.cookie += "leftWristX="+pose.leftWrist.x+",";
			document.cookie += "leftWristY="+pose.leftWrist.y+",";

			document.cookie += "rightWristX="+pose.rightWrist.x+",";
			document.cookie += "rightWristY="+pose.rightWrist.y+",";

			document.cookie += "leftHipX="+pose.leftHip.x+",";
			document.cookie += "leftHipY="+pose.leftHip.y+",";

			document.cookie += "rightHipX="+pose.rightHip.x+",";
			document.cookie += "rightHipY="+pose.rightHip.y+",";

			document.cookie += "leftKneeX="+pose.leftKnee.x+",";
			document.cookie += "leftKneeY="+pose.leftKnee.y+",";

			document.cookie += "rightKneeX="+pose.rightKnee.x+",";
			document.cookie += "rightKneeY="+pose.rightKnee.y+",";

			document.cookie += "leftAnkleX="+pose.leftAnkle.x+",";
			document.cookie += "leftAnkleY="+pose.leftAnkle.y+",";

			document.cookie += "rightAnkleX="+pose.rightAnkle.x+",";
			document.cookie += "rightAnkleY="+pose.rightAnkle.y;

			let d=dist(shoulderR.x,shoulderR.y,shoulderL.x,shoulderL.y);
			dis=d;
			fill(255,0,0);
			// sketch.ellipse(pose.nose.x,pose.nose.y,-d);
			for(let i=0;i<pose.keypoints.length;i++)
			{
				let x=pose.keypoints[i].position.x;
				let y=pose.keypoints[i].position.y;
				fill(0,255,0);
  				ellipse(x,y,16,16);
			}
			for(let i=0;i<skeleton.length;i++)
			{
				let a=skeleton[i][0];
				let b=skeleton[i][1];
				strokeWeight(2);
				stroke(255);
				line(a.position.x,a.position.y,b.position.x,b.position.y);
			}
		}
	}
}