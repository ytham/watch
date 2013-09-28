var Leap = require('leapjs');
var Five = require('johnny-five');
var http = require('http').createServer(handler);
var io = require('socket.io').listen(http);
var handwriting = require('./handwriting');

var hands = [];
var fingers = [];


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
Leap.loop(function (frame) {
  if (frame.hands.length > 0) {
    var hand = frame.hands[0];
    var finger = hand.fingers[0];
    if (frame.hands[0].fingers.length > 0) {
      
    }
  }
});



