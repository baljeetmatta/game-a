const gameCanvas=document.querySelector("#gameCanvas");
gameCanvas.width=window.innerWidth;
gameCanvas.height=window.innerHeight;
gameCanvas.style.background="yellow";

//drawing context
const context= gameCanvas.getContext("2d");


//context.fillRect(100,100,100,200);

// context.fillStyle="red";
// context.fillRect(20,20,50,50);
// context.strokeStyle="green";

// context.strokeRect(100,100,100,200);



// context.beginPath();
// context.moveTo(100,100);
// context.lineTo(300,250);
// context.arc(100,100,40,0,Math.PI);
// context.stroke();
// context.closePath();

// context.font="50px arial"
// context.strokeText("Hello",200,200);

// class Circle{
//     // x=10;
//     display(){
//         this.x=20;

//         console.log(this.x);
//     }
// }

// let c=new Circle();
// c.display();

class Circle{
    constructor(x,y,radius,speed)
    {
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.speed=speed;
        //this.draw();

    }
    draw(){
       // console.log(this.x,this.y,this.radius);
       context.beginPath()
       context.arc(this.x+this.speed,this.y+this.speed,this.radius,0,Math.PI*2);
        context.stroke();
        context.closePath();


    }

}
// let c=new Circle(100,100,50);
// c.draw();


// let c1=new Circle(50,50,10);
// c1.draw();
// let circles=[];
// for(i=0;i<10;i++)
// {
//     let x=Math.random()*window.innerWidth;
//     let y=Math.random()*window.innerHeight;
    
//     let c=new Circle(x,y,50);
//     circles.push(c);

// }

// console.log(circles.length);



let c=new Circle(100,100,30,5);
c.draw();
function animate()
{
    requestAnimationFrame(animate);
    c.speed+=2;
    context.clearRect(0,0,window.innerWidth,window.innerHeight)
     c.draw();

}

animate();

//setInterval(animate,100);

// function animate()
// {
//     c.speed+=5;
//     context.clearRect(0,0,window.innerWidth,window.innerHeight)
//     c.draw();

// }

// console.log("First");
// setTimeout(test,0);
// console.log("Second");
// function test()
// {
//     console.log("test called");
// }



