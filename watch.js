var Leap = require('leapjs');
var Five = require('johnny-five');
var http = require('http').createServer(handler);
var io = require('socket.io').listen(http);
//var handwriting = require('./handwriting');
var fs = require('fs');

var socket;

var hands = [];
var fingers = [];

var board, servo;
var moveAngle;
var boardOptions = { port: '/dev/cu.usbmodemfd111' };

var openAngle = 170;
var closedAngle = 10;
var opened = false;
var shouldOpen = false;
var shouldClose = false;


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


// SocketIO
io.sockets.on('connection', function (s) {
  console.log("SocketIO");
  socket = s;
});


// Leap functions
var controller = new Leap.Controller({enableGestures: true});
controller.on('gesture', function (gesture) {
  //console.log(gesture);
  if (gesture.type === 'swipe' && gesture.state === 'stop' && gesture.duration > 8000) {
    handleSwipe(gesture);
  }
});

controller.connect();

Leap.loop(function (frame) {
  if (frame.hands.length > 0) {
    var hand = frame.hands[0];
    var finger = hand.fingers[0];
    if (frame.hands[0].fingers.length > 3) {
      
    }
  }
});


// Johnny-Five

board = new Five.Board(boardOptions);
board.on('ready', function() {
  servo = new Five.Servo(10);

  // Start closed
  moveAngle = closedAngle;
  servo.move(moveAngle);

  this.loop(50, function () {
    if (shouldOpen) {
      moveAngle = openAngle;
      servo.move(moveAngle);
      shouldOpen = false;
      socket.emit('start', 'Device is Starting');
    }
    if (shouldClose) {
      moveAngle = closedAngle;
      servo.move(moveAngle);
      shouldClose = false;
    }
    //detectOpenOrClose(servo);
  });
});

function detectOpenOrClose(s) {
  if (moveAngle < 90 && opened === false) {
    moveAngle = openAngle;
    s.move(moveAngle);
    console.log("Opening");
  } 
  if (moveAngle > 90 && opened === true) {
    moveAngle = closedAngle;
    s.move(moveAngle);
    console.log("Closing");
  }
}

function handleSwipe(g) {
  if (g.direction[1] > 0.5 && Math.abs(g.direction[0]) < 0.2 && g.speed > 600 && shouldOpen === false) {
    //shouldOpen = true;
    console.log("Swipe Up");
    socket.emit('start', 'Device is Starting');
  }
  if (g.direction[1] < -0.5 && Math.abs(g.direction[0]) < 0.2 && g.speed > 600 && shouldClose === false) {
    //shouldClose = true;
  }
}

/*
function handleSwipe(g) {
  if (g.direction[1] > 0.5 && g.speed > 600 && opened === false) {
    opened = true;
  }
  if (g.direction[1] < -0.5 && g.speed > 600 && opened === true) {
    opened = false;
  }
}*/