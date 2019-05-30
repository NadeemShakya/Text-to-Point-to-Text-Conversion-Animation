
var c = document.getElementById("myCanvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
var ctx = c.getContext("2d");

let input = document.querySelector('input');
let text = input.value;

let particles = [];
class Particles {
  constructor(x, y) {
    this.x  = Math.random() * c.width;
    this.y = Math.random() * c.height;
    this.destination = {
      x : x,
      y: y
    };
    this.delX = 0;
    this.delY = 0;
  }


  velocity = {
    x: Math.random() < 0.5 ? -.5 : .5,
    y: Math.random() < 0.5 ? -.5 : .5,

  }

  updateVelocity() {
    this.delX = this.destination.x - this.x;
    this.delY = this.destination.y - this.y;
    if(Math.abs(this.delX) > 3 || Math.abs(this.delY) > 3) {
      this.velocity.x = this.delX / 50;
      this.velocity.y = this.delY / 50;
    }else {
      this.velocity.x = Math.random() < 0.5 ? -.09 : .09;
      this.velocity.y = Math.random() < 0.5 ? -.09: .09;

    }
  }
  float() {

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
  show() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
  }
}
function initText() {
  ctx.font = "130px Verdana";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(text, c.width / 2, c.height / 2);

}

function getText() {
  let oldParticles = [];
  particles = [];
  var imgData = ctx.getImageData(0, 0, c.width, c.height);
  let pxl = imgData.data;
  for(let i = 0; i < c.width * c.height; i++) {
      
    let alphaI = i * 4 + 3;
    if(pxl[i * 4 + 3] > 0) {
        let x = (Math.floor(alphaI / 4)) % c.width;
        let y = Math.floor(Math.floor(alphaI / c.width) / 4);
        oldParticles.push([x, y]);
        let tempParticle = new Particles(x, y);
        particles.push(tempParticle);
    }
  }
  ctx.clearRect(0, 0, c.width, c.height);
  for(let i = 0; i < oldParticles.length; i+=50) {
    ctx.beginPath();
    ctx.arc(oldParticles[i][0], oldParticles[i][1], 5, 0, Math.PI * 2);
    ctx.fillStyle = "#02b875";
    ctx.fill();
    
  }
}


input.addEventListener("keyup", function() {
  ctx.clearRect(0, 0, c.width, c.height);
  text = input.value;
  initText();
  getText();
})


function animate() {
  ctx.clearRect(0, 0, c.width, c.height);
  for(let i = 0; i < particles.length; i+= 30) {
    particles[i].updateVelocity();
    particles[i].float();
    particles[i].show();
  }

  requestAnimationFrame(animate);
}

animate();
