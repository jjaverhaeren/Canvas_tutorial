const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
// context.fillStyle = "rgb(71, 135, 192)";
// context.fillRect(100, 100, 100, 100);
// context.fillStyle = "rgb(25, 145, 125)";
// context.fillRect(400, 400, 120, 120);

// // Line drawing:
// context.beginPath();
// context.moveTo(300, 200);
// context.lineTo(500, 50);
// context.lineTo(500, 300);
// context.lineTo(50, 450);
// context.strokeStyle = "rgb(237, 161, 252)";
// context.stroke();

// // Arc drawing:
// context.beginPath();
// context.arc(400, 400, 60, 0, Math.PI * 2, false);
// context.strokeStyle = "blue";
// context.stroke();

// Multiple circles randomized
// for (let i = 0; i < 1200; i++) {
//   const x = Math.random() * window.innerWidth;
//   const y = Math.random() * window.innerHeight;
//   const r = Math.random() * 255;
//   const g = Math.random() * 255;
//   const b = Math.random() * 255;
//   const radius = Math.random() * 120 + 20;

//   context.beginPath();
//   context.arc(x, y, radius, 0, Math.PI * 2, false);
//   context.strokeStyle = `rgb(${r}, ${g}, ${b})`;
//   context.stroke();
// }

// Animate circle
const mouse = {
  x: undefined,
  y: undefined,
};

const mouseEvent = event => {
  mouse.x = event.x;
  mouse.y = event.y;
  // console.log(mouse);
};

window.addEventListener("mousemove", mouseEvent);

class Circle {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    const gradient = context.createLinearGradient(
      0,
      0,
      innerWidth,
      innerHeight
    );
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, "transparent");
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.strokeStyle = this.color;
    context.stroke();
    context.closePath();
    // context.fillStyle("red");
    context.fill();
    // console.log(this.radius);
  }

  update() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    this.x += this.dx;
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.y += this.dy;

    this.draw();
  }
}

const circleArray = [];

for (i = 0; i < 50; i++) {
  let radius = Math.random() * 60 + 10;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;
  let dx = (Math.random() - 0.5) * 3;
  let dy = (Math.random() - 0.5) * 4;
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;
  const color = `rgb(${r}, ${g}, ${b})`;
  //   const color = "red";

  circleArray.push(new Circle(x, y, dx, dy, radius, color));
}

// console.log(circleArray);

const animateCircle = () => {
  requestAnimationFrame(animateCircle);
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }

  //   circle.update();
};

animateCircle();
