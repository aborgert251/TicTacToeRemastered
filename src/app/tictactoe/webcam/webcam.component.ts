import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HandTrackingService } from '../services/handtracking.service';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements AfterViewInit {

  @ViewChild('video') video?: ElementRef<HTMLVideoElement>;

  @ViewChild('canvas') canvas?: ElementRef<HTMLCanvasElement>;

  constructor(private handtrackingService: HandTrackingService) { }

  ngAfterViewInit(): void {
    if(!this.video || !this.canvas) {
      return;
    }

    this.handtrackingService.initialize(this.video.nativeElement, this.canvas.nativeElement);
  }

}
