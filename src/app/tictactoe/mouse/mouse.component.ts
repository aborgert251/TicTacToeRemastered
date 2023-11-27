import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MouseService } from '../services/mouse.service';

@Component({
  selector: 'app-mouse',
  templateUrl: './mouse.component.html',
  styleUrls: ['./mouse.component.scss']
})
export class MouseComponent implements AfterViewInit {

  /**
   * Get the div HTML Element of the "mouse"
   */
  @ViewChild('mouse') mouse?: ElementRef<HTMLElement>;

  /**
   * Inject dependency via Dependency Injection.
   * 
   * @param {MouseService} mouseService - Service that handles all "mouse" related stuff. 
   */
  constructor(public mouseService: MouseService) { }

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
