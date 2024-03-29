var ctx = createCanvas("canvas1");
var num_items = 200;
var radius = 80;
ctx.lineWidth = 2;
var particles = [];

// working out the angles
// this was covered here: https://hackernoon.com/math-sin-and-math-cos-the-creative-coders-best-friend-597d69000644#.hs4cfjno1

for (var i = 0; i < num_items; i++) {
  var angle = radians(distributeAngles(i, num_items));
  particles[i] = {
    x: w/2 + Math.cos(angle) * radius,
    y: h/2 + Math.sin(angle) * radius,
    angle: angle
  }
}


function draw(){

  ctx.background(000);
  //console.log(Mic.data);
  for (var i = 0; i < particles.length; i++) {

    var p = particles[i];
    //var s = Mic.mapRawSound(i, particles.length, 0, 100);
    var s = Mic.mapSound(i, particles.length, 10, 100);
    // get a nice greyscale spectrum
    //ctx.strokeStyle = rgb(map(i, 0, particles.length, 0, 255));
    // get a nice colour spectrum
    ctx.strokeStyle = hsl(map(i, 0, particles.length, 0, 360), 90, 50);

    x2 = w/2 + Math.cos(p.angle) * (s + radius);
		y2 = h/2 + Math.sin(p.angle) * (s + radius);
    ctx.line(p.x, p.y, x2, y2);
  }

}