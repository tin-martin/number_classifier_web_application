
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var canvasW = c.width;
var canvasH = c.height;
var WIDTH = 28;
var HEIGHT = 28;

var ratioW = canvasW/WIDTH;
var ratioH = canvasH/HEIGHT;

var img_arr = [];
for(var row=0;row<HEIGHT;row++){
    var temp_arr = [];
    for(var col=0; col<WIDTH;col++){
        temp_arr.push(0);
    }
    img_arr.push(temp_arr);
}

//function _clear(){
  //  for(var row=0;row<canvasH;row++){
    //    for(var col=0; col<canvasW;col++){
      //      if(img_arr[row][col] == 0){
        //        img_arr[row][col] = 255;
        //    }
        //}
    //}
    //ctx.clearRect(0,0,canvasW,canvasH);
    //console.log("clear");
//}

function draw(){
    var mouseDown = false;
    c.addEventListener('mousedown', (e) =>{
        mouseDown = true;
        var rect = c.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY -  rect.top;
        img_arr[Math.floor(x/ratioH)][Math.floor(y/ratioW)] = 255;
        ctx.fillStyle = "black";
        ctx.fillRect(Math.floor(x/ratioH)*ratioH,Math.floor(y/ratioW)*ratioW,ratioW,ratioH);
    });
    c.addEventListener('mouseup', (e) =>{
        mouseDown = false;
    });       
    c.addEventListener('mousemove', (e) =>{
        if(mouseDown){
            var rect = c.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY -  rect.top;
            img_arr[Math.floor(x/ratioH)][Math.floor(y/ratioW)] = 255;
            ctx.fillStyle = "black";
            ctx.fillRect(Math.floor(x/ratioH)*ratioH,Math.floor(y/ratioW)*ratioW,ratioW,ratioH);
        }
    });
    console.log("draw");
}

function _clear(){
    for(var row=0;row<HEIGHT;row++){
        for(var col=0; col<WIDTH;col++){
            if(img_arr[row][col] == 255){
                img_arr[row][col] = 0;
            }
        }
    }
    ctx.clearRect(0,0,canvasW,canvasH);
    console.log("clear");
}

function erase(){
    var mouseDown = false;
    c.addEventListener('mousedown', (e) =>{
        mouseDown = true;
        var rect = c.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY -  rect.top;
        img_arr[Math.floor(x/ratioH)][Math.floor(y/ratioW)] = 0;
        ctx.clearRect(Math.floor(x/ratioH)*ratioH,Math.floor(y/ratioW)*ratioW,ratioW,ratioH);
    });
    c.addEventListener('mouseup', (e) =>{
        mouseDown = false;
    });       
    c.addEventListener('mousemove', (e) =>{
        if(mouseDown){
            var rect = c.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY -  rect.top;
            img_arr[Math.floor(x/ratioH)][Math.floor(y/ratioW)] = 0;
            ctx.clearRect(Math.floor(x/ratioH)*ratioH,Math.floor(y/ratioW)*ratioW,ratioW,ratioH);
        }
    });
    console.log("erase");
}


function predict(){
    let xhr = new XMLHttpRequest();

    xhr.open("POST", "http://127.0.0.1:5000/json", false);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.send(JSON.stringify({img_arr}));
//<!--window.location.href = "http://127.0.0.1:5000/pre"; -->
}

