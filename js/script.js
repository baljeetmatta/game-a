//1. Project Setup -> static->Canvas, script Add
//Javascript ->references, canvas setup
//2. Player setup
//3. Down
//4. Gravity
//5. Movement
//6. Restrict Screen

const gameCanvas=document.querySelector("#gameCanvas");
gameCanvas.width=window.innerWidth;
gameCanvas.height=window.innerHeight;
gameCanvas.style.background="yellow";
let gravity=0.5;
const context=gameCanvas.getContext("2d");
const keys={
    right:{
        pressed:false
    },
    left:
    {
        pressed:false
    }
}
class Platform{
    constructor(x,y,width,height)
    {
        this.position={
            x,
            y
        }
        this.width=width;
        this.height=height;
    }
    draw()
    {
        context.fillStyle="black";
        // console.log(this.position.x,this.position.y,this.width,this.height);
      // context.fillRect(100,100,40,40);
        context.fillRect(this.position.x,this.position.y,this.width,this.height);

    }
}
class Player{
    constructor(){
        this.position={
            x:100,
            y:200
        }
        this.velocity={
            x:0,
            y:2
        }
        this.width=20;
        this.height=20;
    }
    draw(){
        context.fillStyle="red";
        context.fillRect(this.position.x,this.position.y,this.width,this.height);

    }
    update(){
        
        this.position.y+=this.velocity.y;
        this.position.x+=this.velocity.x;
        if(this.position.y+this.height+this.velocity.y<gameCanvas.height)
             this.velocity.y+=gravity;   
        else
            this.velocity.y=0;

 

this.draw();
    }
}
const player=new Player();
player.draw();
const platform=new Platform(300,gameCanvas.height-75,30,75);
platform.draw();

function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0,0,window.innerWidth,window.innerHeight)
   platform.draw();
    player.update();
    


    if(keys.right.pressed && player.position.x<=600)
        player.velocity.x=2;
    else if (keys.left.pressed && player.position.x>100)
        player.velocity.x=-2;
    else
        player.velocity.x=0;


    if(player.position.x+player.width>=platform.position.x)
            player.velocity.x=0;

       
}

animate();

addEventListener("keydown",(e)=>{
    console.log(e);
    if(e.key=="ArrowRight")
        keys.right.pressed=true;
        //player.velocity.x=2;
    if(e.key=="ArrowLeft")
        keys.left.pressed=true;
        //player.velocity.x=-2;
    if(e.key=="ArrowUp")
        player.velocity.y=-10;

})
addEventListener("keyup",(e)=>{
    console.log(e);
    if(e.key=="ArrowRight")
        keys.right.pressed=false;
        //player.velocity.x=0;
     if(e.key=="ArrowLeft")
        keys.left.pressed=false;
       // player.velocity.x=0;

})

// addEventListener("keydown",(e)=>{
//     console.log(e);
//     if(e.key=="ArrowRight")
//         player.velocity.x=2;
//     if(e.key=="ArrowLeft")
//         player.velocity.x=-2;
//     if(e.key=="ArrowUp")
//         player.velocity.y=-10;

// })
// addEventListener("keyup",(e)=>{
//     console.log(e);
//     if(e.key=="ArrowRight")
//         player.velocity.x=0;
//      if(e.key=="ArrowLeft")
//         player.velocity.x=0;

// })