import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { MouseService } from '../services/mouse.service';

@Component({
    selector: 'app-mouse',
    templateUrl: './mouse.component.html',
    styleUrls: ['./mouse.component.scss'],
    standalone: true
})
export class MouseComponent implements AfterViewInit {
  mouseService = inject(MouseService);


  /**
   * Get the div HTML Element of the "mouse"
   */
  @ViewChild('mouse') mouse?: ElementRef<HTMLElement>;

  /**
   * Pass the mouse HTML Element to the mouseService to connect it and e.g. update the position. 
   */
  ngAfterViewInit() {
    if(!this.mouse) {
      return;
    }

    this.mouseService.setMouse(this.mouse.nativeElement);
  }
}
