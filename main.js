status="";
video="";
object=[];
function preload(){
video=createVideo("video.mp4");
/video.hide();
}
function draw(){
image(video,0,0,480,380);
if(status !=""){
    objectDetector.detect(video,gotResult);
    for(i=0;i<object.length;i++){
        document.getElementById("status").innerHTML="Status: Object has been detected";
        document.getElementById("objectcount").innerHTML="No. of objects detected are: "+object.length;

        fill("#FF0000");
        percent=floor(object[i].confidence*100);
        text(object[i].label+" "+percent+" %",object[i].x+15,object[i].y+15);
        noFill();
        stroke("#FF0000");
        rect(object[i].x,object[i].y,object[i].width,object[i].height,);
    }
}
}
function setup(){
canvas=createCanvas(480,380);
canvas.center();
}
function begin(){
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelLoaded(){
console.log("The model has been loaded thank you for your patience (:");
status=true;
video.loop();
video.speed(1);
video.volume(0);
}
function gotResult(error,results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        object=results;
    }
}