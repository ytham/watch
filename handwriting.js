var Leap = require('leapjs');
var hands = [];
var fingers = [];
var coordinateQueue = [];
var firstFrame = true;

var handwriting = new Handwriting();

Leap.loop(function (frame) {
  if (frame.hands.length > 0) {
    hands = frame.hands[0];
    fingers = frame.hands[0].fingers;
    if (fingers.length > 0) {
      var fingertip = fingers[0].tipPosition;
      //console.log(fingers[0].tipPosition);
      if (fingertip[2] < 0) {
        var coord = new WritingCoordinate(fingertip[0], fingertip[1], nil);
        if (firstFrame) {
          coordinateQueue.push(coord);
        } else {
          if (distance(coordinateQueue[0],coord) > 20) {
            coordinateQueue.push(coord);
            // Need to include angle
          }
      }
      if (fingertip[2] > 0) {
        handwriting.clear();
        firstFrame = true;
        console.log("Handwriting cleared.");
      }
    }
  }
});

function Handwriting () {
  this.coordinateStack = [];  
}

Handwriting.prototype.push = function (coordinate) {
  this.coordinateStack.push(coordinate);
  console.log("Coordinate pushed: " + coordinate.x + ", " + coordinate.y);
}

Handwriting.prototype.clear = function () {
  for (var i = 0; i < this.coordinateStack.length; i++) {
    delete this.coordinateStack[i];
  }
  this.coordinateStack = [];
}

Handwriting.prototype.read = function () {
  coordinateStack.reverse();
  for (var i = 0; i < this.coordinateStack.length; i++) {
    //this.coordinateStack.
  }
}

function WritingCoordinate(x,y,angle) {
  this.x = x;
  this.y = y;
  this.angle = angle;
}

function distance(a,b) {
  return Math.sqrt(Math.sq(a.x-b.x) + Math.sq(a.y-b.y));
}

module.exports = Handwriting;
module.exports = WritingCoordinate;
