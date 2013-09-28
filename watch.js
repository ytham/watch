var Leap = require('leapjs');
var Five = require('johnny-five');
var io = require('socket.io');
var http = require('http');

var hands = [];
var fingers = [];


Leap.loop(function (frame) {
  if (frame.hands.length > 0) {
    var hand = frame.hands[0];
    var finger = hand.fingers[0];
    if (frame.hands[0].fingers.length > 0) {
      
    }
  }
});


