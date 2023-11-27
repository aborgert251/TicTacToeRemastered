import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HandTrackingService } from '../services/handtracking.service';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements AfterViewInit {

  /**
   * Get the video HTML Element
   */
  @ViewChild('video') video?: ElementRef<HTMLVideoElement>;

  /**
   * Get the canvas HTML Element
   */
  @ViewChild('canvas') canvas?: ElementRef<HTMLCanvasElement>;

  /**
   * Inject some dependencies via Dependency Injection
   * 
   * @param {HandtrackingService} handtrackingService - The service that handles all hand tracking related stuff
   */
  constructor(private handtrackingService: HandTrackingService) { }

  /**
   * Initialize the handTrackingService by passing the HTML Video and Canvas element into initialize function of the service.
   */
  ngAfterViewInit() {
    if(!this.video || !this.canvas) {
      return;
    }

    this.handtrackingService.initialize(
      this.video.nativeElement, 
      this.canvas.nativeElement
    );
  }

}
