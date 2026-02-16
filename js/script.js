//1. Project Setup -> static->Canvas, script Add
//Javascript ->references, canvas setup
//2. Player setup
//3. Down
//4. Gravity
//5. Movement
//6. Restrict Screen
//7. Platform
//8. Multiple Platform
//9. Scrolling Effect
//10. Win Situation
"use strict"
let offset=0;
const speed=2;


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
    constructor(x,y,image)
    {
        this.position={
            x,
            y
        }
        this.image=image;
        this.width=image.width;
        this.height=image.height;
    }
    draw()
    {
       // context.fillStyle="black";
        // console.log(this.position.x,this.position.y,this.width,this.height);
      // context.fillRect(100,100,40,40);
       // context.fillRect(this.position.x,this.position.y,this.width,this.height);
        context.drawImage(this.image,this.position.x,this.position.y);
        
    }
}
class Player{
    constructor(){
        this.position={
            x:100,
            y:200
        }
        this.frames=0;
        this.velocity={
            x:0,
            y:2
        }
        this.width=66;
        this.height=150;
        this.cropWidth=177;
        this.image=playerRightStand;
        
    }
    draw(){
        this.frames++;
        if(this.frames>59 && this.image==playerRightStand)
            this.frames=0;
          else if(this.frames>  29 && this.image==playerRightRun)
            this.frames=0;
        
       // context.fillStyle="red";
        //context.fillRect(this.position.x,this.position.y,this.width,this.height);
        context.drawImage(
            this.image,
            this.cropWidth*this.frames,
            0,
            this.cropWidth,
            400,
            this.position.x,
            this.position.y,
            this.width,
            this.height);

    }
    update(){
        
        this.position.y+=this.velocity.y;
        this.position.x+=this.velocity.x;
        if(this.position.y+this.height+this.velocity.y<gameCanvas.height)
             this.velocity.y+=gravity;   
        else
            {this.velocity.y=0;
                window.location.reload();

            }

 

this.draw();
    }
}


// //const platform=new Platform(300,gameCanvas.height-75,30,75);
// const platform=new Platform(200,200,100,30);

// platforms.push(platform);

// //const platform1=new Platform(550,gameCanvas.height-75,30,75);
// const platform1=new Platform(500,300,130,25);
// const platform2=new Platform(0,gameCanvas.height-40,400,40);
// const platform3=new Platform(450,gameCanvas.height-40,400,40);

//const platform=new Platform(300,gameCanvas.height-75,30,75);
//const platform=new Platform(200,200,);

//platforms.push(platform);

//const platform1=new Platform(550,gameCanvas.height-75,30,75);
//const platform1=new Platform(500,300,130,25);

let count=0;
const totalImages=6;

const backImage=new Image();
backImage.src="./images/background.png";
backImage.addEventListener("load"  ,()=>{
    count++;
})

const hillsImage=new Image();
hillsImage.src="./images/hills.png";
hillsImage.addEventListener("load"  ,()=>{
    count++;
})

const basePlatform=new Image();
basePlatform.src="./images/platform.png";

basePlatform.addEventListener("load"  ,()=>{
    count++;
})

const baseSmallPlatform=new Image();
baseSmallPlatform.src="./images/platformSmallTall.png";

baseSmallPlatform.addEventListener("load"  ,()=>{
    count++;
})

const playerRightStand=new Image();
playerRightStand.src="./images/spriteStandRight.png";

playerRightStand.addEventListener("load"  ,()=>{
    count++;
})


const playerRightRun=new Image();
playerRightRun.src="./images/spriteRunRight.png";

playerRightRun.addEventListener("load"  ,()=>{
    count++;
})


let id=setInterval(()=>{

    if(count==totalImages)
    {
        clearInterval(id);
        playerSetup();

    }
},100)


let  player;
let platforms=[]
function playerSetup()
{

player=new Player();
player.draw();
const platform2=new Platform(0,gameCanvas.height-basePlatform.height,basePlatform);
const platform3=new Platform(basePlatform.width+80,gameCanvas.height-basePlatform.height,basePlatform);
const platform4=new Platform(basePlatform.width*2+80-2,gameCanvas.height-basePlatform.height,basePlatform);

const platform5=new Platform(200,gameCanvas.height-baseSmallPlatform.height,baseSmallPlatform);

//platforms.push(platform1);
platforms.push(platform5);
platforms.push(platform2);
platforms.push(platform3);
platforms.push(platform4);

animate();

}


//platform.draw();

function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0,0,window.innerWidth,window.innerHeight);
  //  backImage.draw();
    //hillsImage.draw();
    context.drawImage(backImage,0-offset,0);
    context.drawImage(hillsImage,0-offset,0);

  platforms.forEach((platform)=>{
        platform.draw();
  })
    
    player.update();
    

    if(keys.right.pressed)
    {
        player.image=playerRightRun;
        player.width=127.87;
        player.cropWidth=340;
    }

    else
    {player.image=playerRightStand;
        player.width=66
        player.cropWidth=177;

    }
    if(keys.right.pressed && player.position.x<=600)
    {    player.velocity.x=speed;
       // offset+=speed;
    }
    else if (keys.left.pressed && player.position.x>100)
       { player.velocity.x=-speed;
   // offset-=speed;
       }
    else
    {
        player.velocity.x=0;
        if(keys.right.pressed)
            {offset+=speed;
            platforms.forEach((item)=>{
                item.position.x-=speed;
                
            })}

            if(keys.left.pressed){
                offset-=2;

            platforms.forEach((item)=>{
                item.position.x+=speed;
                
            })
        }

    }

    platforms.forEach((platform)=>{

 if(player.position.x+player.width>=platform.position.x
        && player.position.x+player.width<=platform.position.x+platform.width &&
         player.position.y+player.height>=platform.position.y &&
        player.position.y<=platform.position.y+platform.height)
            player.velocity.x=0;

            if(player.position.y+player.height<=platform.position.y

                && player.position.y+player.height+player.velocity.y>=platform.position.y
                && player.position.x+player.width>=platform.position.x
        && player.position.x<=platform.position.x+platform.width
       

            )
                player.velocity.y=0;
    })
   
    console.log(offset);

       
}


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


// class GenericImage
// {
//     constructor(imagePath)
//     {
//         const image=new Image();
//         image.src=imagePath;
//         this.image=image;

//     }
//     draw()
//     {
//         context.drawImage(this.image,0-offset,0);

//     }
// }

// const backImage=new GenericImage("./images/background.png");

// const hillsImage=new GenericImage("./images/hills.png");

// const basePlatform=new GenericImage("./images/platform.png");






