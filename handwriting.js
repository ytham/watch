var Leap = require('leapjs');
var hands = [];
var fingers = [];

var handwriting = new Handwriting();

Leap.loop(function (frame) {
  if (frame.hands.length > 0) {
    hands = frame.hands[0];
    fingers = frame.hands[0].fingers;
    if (fingers.length > 0) {
      var fingertip = fingers[0].tipPosition;
      //console.log(fingers[0].tipPosition);
      if (fingertip[2] < 0) {
        var coord = new Coordinate(fingertip[0], fingertip[1]);
        handwriting.push(coord);
      }
      if (fingertip[2] > 0) {
        handwriting.clear();
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
  for (var i = 0; i < this.coordinateStack.length; i++) {
    //this.coordinateStack.
  }
}

function Coordinate(x,y) {
  this.x = x;
  this.y = y;
}

module.exports = Handwriting;
