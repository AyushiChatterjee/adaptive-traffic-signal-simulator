// sketch.js

let canvasSize = 600;

function setup() {
  let cnv = createCanvas(canvasSize, canvasSize);
  cnv.parent('canvas-container');
}

function draw() {
  background(40); // dark grey background

  drawIntersection();
}



//intersection roads

function drawIntersection() {
  push();
  fill(60);
  noStroke();
  
  let roadWidth = 100;
  let center = canvasSize / 2;

  rect(center - roadWidth / 2, 0, roadWidth, canvasSize);
  rect(0, center - roadWidth / 2, canvasSize, roadWidth);

  // Lane dividers (dashed white lines)
  stroke(255);
  strokeWeight(2);
  drawingContext.setLineDash([10, 10]);

  line(center, 0, center, canvasSize); // vertical divider
  line(0, center, canvasSize, center); // horizontal divider

  drawingContext.setLineDash([]); // reset dash for other shapes

  pop();
}

function drawSignals(currentPhase) {
  let center = canvasSize / 2;
  let offset = 90; // distance from center

  noStroke();

  // North signal
  fill(currentPhase === 'A' ? color(0, 255, 0) : color(255, 0, 0));
  ellipse(center, center - offset, 20, 20);

  // South signal
  fill(currentPhase === 'A' ? color(0, 255, 0) : color(255, 0, 0));
  ellipse(center, center + offset, 20, 20);

  // East signal
  fill(currentPhase === 'B' ? color(0, 255, 0) : color(255, 0, 0));
  ellipse(center + offset, center, 20, 20);

  // West signal
  fill(currentPhase === 'B' ? color(0, 255, 0) : color(255, 0, 0));
  ellipse(center - offset, center, 20, 20);
}


let currentPhase = 'A';
let phaseStartTime = 0;
let greenTimes = { A: 60, B: 60 }; // will be recalculated
let counts = { N: 5, S: 5, E: 5, W: 5 }; // hardcoded for now

let arrivalRates = { N: 1, S: 1, E: 1, W: 1 }; // cars per second, will be read from sliders

function setup() {
  let cnv = createCanvas(canvasSize, canvasSize);
  cnv.parent('canvas-container');
  
  phaseStartTime = millis();
  greenTimes = computeGreenTimes(counts);
}

function draw() {
  background(40);
  
  updateArrivalRatesFromSliders();
  updateCounts();
  
  drawIntersection();

  let elapsed = (millis() - phaseStartTime) / 1000;
  let currentDuration = greenTimes[currentPhase];

  if (elapsed >= currentDuration) {
    currentPhase = currentPhase === 'A' ? 'B' : 'A';
    phaseStartTime = millis();
    greenTimes = computeGreenTimes(counts);
    elapsed = 0;
  }

  drawSignals(currentPhase);
  drawTimerText(elapsed, currentDuration);
  updateStatsPanel();
  drawCounts(); // new — show live numbers
}

function updateArrivalRatesFromSliders() {
  arrivalRates.N = parseFloat(document.getElementById('rateN').value);
  arrivalRates.S = parseFloat(document.getElementById('rateS').value);
  arrivalRates.E = parseFloat(document.getElementById('rateE').value);
  arrivalRates.W = parseFloat(document.getElementById('rateW').value);
}

function updateCounts() {
  let dt = deltaTime / 1000; // p5 built-in, time since last frame in ms

  // Cars arriving
  counts.N += arrivalRates.N * dt;
  counts.S += arrivalRates.S * dt;
  counts.E += arrivalRates.E * dt;
  counts.W += arrivalRates.W * dt;

  // Cars clearing — only the lanes in the current green phase drain
  let clearRate = 2; // cars cleared per second when green
  if (currentPhase === 'A') {
    counts.N = Math.max(0, counts.N - clearRate * dt);
    counts.S = Math.max(0, counts.S - clearRate * dt);
  } else {
    counts.E = Math.max(0, counts.E - clearRate * dt);
    counts.W = Math.max(0, counts.W - clearRate * dt);
  }
}

function drawCounts() {
  let center = canvasSize / 2;
  
  drawCountBadge(center, center - 130, Math.floor(counts.N));
  drawCountBadge(center, center + 150, Math.floor(counts.S));
  drawCountBadge(center + 150, center, Math.floor(counts.E));
  drawCountBadge(center - 150, center, Math.floor(counts.W));
}

function drawCountBadge(x, y, value) {
  push();
  // background chip
  fill(20, 20, 20, 220);
  stroke(63, 185, 80); // green border, matches theme accent
  strokeWeight(1.5);
  rectMode(CENTER);
  rect(x, y, 32, 22, 6);
  
  // number text
  noStroke();
  fill(255);
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(value, x, y);
  pop();
}

function drawTimerText(elapsed, duration) {
  let remaining = Math.ceil(duration - elapsed);
  fill(255);
  noStroke();
  textSize(20);
  textAlign(CENTER);
  text(`Phase: ${currentPhase}  |  Time left: ${remaining}s`, canvasSize / 2, 30);
}

function updateStatsPanel() {
  document.getElementById('statPhase').textContent = currentPhase;
  document.getElementById('statTime').textContent = Math.ceil(greenTimes[currentPhase] - ((millis() - phaseStartTime)/1000)) + 's';
  document.getElementById('statN').textContent = Math.floor(counts.N);
  document.getElementById('statS').textContent = Math.floor(counts.S);
  document.getElementById('statE').textContent = Math.floor(counts.E);
  document.getElementById('statW').textContent = Math.floor(counts.W);

  document.getElementById('valN').textContent = arrivalRates.N.toFixed(1);
  document.getElementById('valS').textContent = arrivalRates.S.toFixed(1);
  document.getElementById('valE').textContent = arrivalRates.E.toFixed(1);
  document.getElementById('valW').textContent = arrivalRates.W.toFixed(1);
}
