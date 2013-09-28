var Leap = require('leapjs');
var Five = require('johnny-five');
var http = require('http').createServer(handler);
var io = require('socket.io').listen(http);
//var handwriting = require('./handwriting');
var fs = require('fs');

var hands = [];
var fingers = [];

var board, servo;
var moveAngle;
var boardOptions = { port: '/dev/cu.usbmodemfa131' };

var openAngle = 160;
var closedAngle = 20;


// HTTP server request handler
function handler (req, res) {
  fs.readFile(__dirname + '/index.html', function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error 500');
    }

    res.writeHead(200);
    res.end(data);
  });
}

http.listen(8080);


// Leap functions
var controller = new Leap.Controller({enableGestures: true});
controller.on('swipe', function () {
  console.log(gesture);
  if (gesture.type === 'swipe') {
    handleSwipe();
  }
});

Leap.loop(function (frame) {
  if (frame.hands.length > 0) {
    var hand = frame.hands[0];
    var finger = hand.fingers[0];
    if (frame.hands[0].fingers.length > 3) {
      
    }
  }
});


// Johnny-Five
/*
board = new Five.Board();
board.on('ready', function() {
  servo = new Five.Servo(9);

  moveAngle = closedAngle;

  this.loop(50, function () {
    detectOpenOrClose(servo);
  });
});*/

function detectOpenOrClose(s) {
  if (moveAngle < 90) {
    moveAngle = openAngle;
    s.move(moveAngle);
  } 
  if (moveAngle > 90) {
    moveAngle = closedAngle;
    s.move(moveAngle);
  }
}

function handleSwipe() {

}