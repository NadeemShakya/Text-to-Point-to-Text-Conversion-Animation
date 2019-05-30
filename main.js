
let canvas = document.getElementById("myCanvas");
let input = document.querySelector('input');
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let text = input.value;
let particles = [];
let colorPalette = [
    "#081226",
    "#011C40",
    "#1F4C73",
    "#3A6D8C",
    "#689BA6"



];

function initializeText() {

  if(canvas.width < 500) {
    let userTextSplit = text.split(" ");
    console.log(userTextSplit);
    ctx.font = `lighter ${canvas.width / 5}px Verdana`;
    for(let i = 0; i < userTextSplit.length; i++) {
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText(userTextSplit[i], canvas.width / 2, canvas.height / 4 + i * canvas.width / 4);

    }
  }else {
    ctx.font = `lighter ${canvas.width / 9}px Verdana`;  ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  }

}

function getTextInformation() {
  particles = [];
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let pxl = imgData.data;
  for(let i = 0; i < canvas.width * canvas.height; i++) {
    let alphaIndex = i * 4 + 3;
    if(pxl[i * 4 + 3] > 0) {
        let x = (Math.floor(alphaIndex / 4)) % canvas.width;
        let y = Math.floor(Math.floor(alphaIndex / canvas.width) / 4);
        let tempParticle = new Particles(x, y);
        particles.push(tempParticle);
    }
  }
}

input.addEventListener("keyup", function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  text = input.value;
  initializeText();
  getTextInformation();
})


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(let i = 0; i < particles.length; i+= 10) {
    particles[i].updateVelocity();
    particles[i].float();
    particles[i].show();
  }
  requestAnimationFrame(animate);
}

animate();
