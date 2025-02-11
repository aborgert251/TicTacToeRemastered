import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { HandTrackingService } from '../services/handtracking.service';
import { HoverDirective } from '../directives/hover.directive';

@Component({
    selector: 'app-webcam',
    templateUrl: './webcam.component.html',
    styleUrls: ['./webcam.component.scss'],
    standalone: true,
    imports: [HoverDirective]
})
export class WebcamComponent implements AfterViewInit {
  private handtrackingService = inject(HandTrackingService);


  /**
   * Get the video HTML Element
   */
  @ViewChild('video') video?: ElementRef<HTMLVideoElement>;

  /**
   * Get the canvas HTML Element
   */
  @ViewChild('canvas') canvas?: ElementRef<HTMLCanvasElement>;

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
