import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MouseService } from '../services/mouse.service';

@Component({
  selector: 'app-mouse',
  templateUrl: './mouse.component.html',
  styleUrls: ['./mouse.component.scss']
})
export class MouseComponent implements AfterViewInit {

  @ViewChild('mouse') mouse?: ElementRef<HTMLElement>;

  constructor(public mouseService: MouseService) { }

  ngAfterViewInit(): void {
    if(!this.mouse) {
      return;
    }

    this.mouseService.setMouse(this.mouse.nativeElement);
  }
}
