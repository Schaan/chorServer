import { Component } from '@angular/core';
// import { FileService } from './file.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
// import * as createPlayer from 'web-audio-player';
// import * as audioAPI from 'web-audio-api';

// interface ItemsResponse {
//   data: ArrayBuffer;
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private loading: boolean = true;
  private audioCtx: AudioContext;
  private audioBuffer: AudioBuffer;
  state:string = "Stop";

  // constructor(private fileservice: FileService) {
  constructor(private http: HttpClient) {
    this.audioCtx = new AudioContext();
    this.fetchAudio()
      .then(buffer => {
        this.audioBuffer = buffer as AudioBuffer;
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
    bufferSource.connect(this.audioCtx.destination);
    bufferSource.start(0);
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


}
