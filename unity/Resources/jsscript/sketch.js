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