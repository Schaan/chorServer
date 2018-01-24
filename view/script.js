
var loading = true;
var audioCtx = new AudioContext();
var state = "Stop";


function fetchAudio() {
  $http.get('api/audios').then(function(res) {
    audioCtx.decodeAudioData(res);
  }).then(function (buffer) {
    var bufferSource = this.audioCtx.createBufferSource();
    bufferSource.buffer = buffer;
    bufferSource.connect(this.audioCtx.destination);
    bufferSource.start(0);
  });
}

// function playAudio() {
//   let bufferSource = this.audioCtx.createBufferSource();
//   bufferSource.buffer = this.audioBuffer;
//   bufferSource.connect(this.audioCtx.destination);
//   bufferSource.start(0);
// }

function holdAudio() {
  if (audioCtx.state === "running") {
    audioCtx.suspend();
    state = "Resume";
  } else if (audioCtx.state === "suspended") {
    audioCtx.resume();
    state = "Stop";
  }
}
