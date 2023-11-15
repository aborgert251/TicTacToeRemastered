import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MouseService {

  posX: number = 10;

  posY: number = 10;

  hoveringCardId: boolean[] = [
    false, false, false, 
    false, false, false,
    false, false, false
  ];

  isClicking: boolean = false;

  mouseElement?: HTMLElement;

  positionUpdated$ = new Subject<void>();

  mouseClicked$ = new Subject<void>();

  setMouse(mouse: HTMLElement) {
    this.mouseElement = mouse;
    this.mouseElement.style.left = this.posX + 'px';
    this.mouseElement.style.top = this.posY + 'px';
  }

  setMousePosition(x: number, y: number) {
    if(!this.mouseElement) {
      return;
    }

    this.mouseElement.style.left = x + 'px';
    this.mouseElement.style.top = y + 'px';
    this.posX = x;
    this.posY = y;
    this.positionUpdated$.next();
  }

  setIsClicking(isClicking: boolean) {
    this.isClicking = isClicking;
    this.mouseClicked$.next();
  }
}
