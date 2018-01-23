const express = require('express');
const fs = require('fs');
const router = express.Router();
// var Buffer = require('buffer/').Buffer;

const sendError = (err,res)=>{
  response.status=501;
  response.message = typeof err=='object' ? err.message : err;
  res.status(501).json(response);
}

let response = {
  status:200,
  data:[],
  message:null
}

router.get('/audios', (req,res)=>{
  try {
    var file = fs.readFileSync('./files/Top_of_the_World.mp3');
    res.send(new Buffer(file));
    // res.send('connected to audio');
  } catch(e) {
    sendError(e, res);
  }
});

module.exports = router;
