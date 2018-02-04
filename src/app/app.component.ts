import { Component } from '@angular/core';
// import { FileService } from './file.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { analyze } from 'web-audio-beat-detector';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as Granular from 'soundbank-granular/index.js';
import * as Bopper from 'bopper/index.js';
// declare var Granular: any;
// declare var Bopper: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private loading: boolean = true;
  private audioCtx: AudioContext;
  private audioBuffer: AudioBuffer;
  private granularNode: any;
  private scheduler: any;
  state:string = "Stop";
  tempo:number;

  // constructor(private fileservice: FileService) {
  constructor(private http: HttpClient) {
    this.audioCtx = new AudioContext();
    this.fetchAudio()
      .then(buffer => {
        this.audioBuffer = buffer as AudioBuffer;
        this.scheduler = Bopper(this.audioCtx);

        this.granularNode = Granular(this.audioCtx, {scheduler: this.scheduler});
        this.granularNode.offset = [0,1];
        this.granularNode.transpose = 0;
        this.granularNode.sync = true;
        this.granularNode.attack = 0;
        this.granularNode.release = 1;
        this.granularNode.buffer = this.audioBuffer;
      }).then(() => {
        analyze(this.audioBuffer)
          .then((tempo) =>{
            this.tempo = Math.floor(tempo);
            this.scheduler.setTempo(tempo);

            this.granularNode.length = this.granularNode.buffer.duration * tempo / 60;
            this.granularNode.rate = 32;
            this.scheduler.start();
          });
      }).then(() => {
        this.loading = false;
        this.playAudio();
      });
  //   this.message = 'here';
  //   this.audio.on('load', ()=>{
  //     console.log('Audio loaded...');
  //     this.audio.play();
  //     this.audio.node.connect(this.audio.context.destination);
  // });
  }

  fetchAudio() {
    return this.http.get('api/audios', {responseType: 'arraybuffer'})
      .toPromise().then(res => {
        return new Promise((resolve, reject) => {
          this.audioCtx.decodeAudioData(res, resolve, reject);
        });
      });
  }

  playAudio() {
    let bufferSource = this.audioCtx.createBufferSource();
    bufferSource.buffer = this.audioBuffer;
    // bufferSource.connect(this.audioCtx.destination);
    // bufferSource.start(0);
    this.granularNode.connect(this.audioCtx.destination);
    this.granularNode.start(0);
    console.log(this.granularNode);
  }

  holdAudio() {
    if (this.audioCtx.state === "running") {
      this.audioCtx.suspend();
      this.state = "Resume";
    } else if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
      this.state = "Stop";
    }
  }

  changeTempo(value: number) {
    this.scheduler.setTempo(value);
    this.granularNode.rate = Math.floor(32 * this.tempo / value);
  }
}
