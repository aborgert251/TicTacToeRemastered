import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MouseService {

  /**
   * The x position of the mouse (default 10px)
   */
  posX = 10;

  /**
   * The y position of the mouse (default 10px)
   */
  posY = 10;

  /**
   * TODO: Move to GameService because they are not really mouse related
   * The list of all available cards in game. Boolean values represent the hovering state.
   */
  hoveringCardId: boolean[] = [
    false, false, false, 
    false, false, false,
    false, false, false
  ];


  /**
   * Indicator if the mouse is clicking
   */
  isClicking = false;

  /**
   * The div HTML element of the "mouse".
   */
  mouseElement?: HTMLElement;

  /**
   * Subject that is emitted if the mouse position is updated. E.g. to trigger checking the hover state.
   */
  positionUpdated$ = new Subject<void>();

  /**
   * Subject that is emitted if the mouse is clicked.
   */
  mouseClicked$ = new Subject<void>();

  /**
   * Function to connect the mouse HTML Element to the service and set the default position.
   * 
   * @param {HTMLElement} mouse - HTML element of the mouse
   */
  setMouse(mouse: HTMLElement) {
    this.mouseElement = mouse;
    this.mouseElement.style.left = this.posX + 'px';
    this.mouseElement.style.top = this.posY + 'px';
  }

  /**
   * Set the position of the mouse and emit the positionUpdate$ subject.
   * 
   * @param {number} x - The new x position 
   * @param {number} y - The new y position
   * @returns 
   */
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

  /**
   * Set the clicking state of the mouse and emit mouseClicked$ subject.
   * 
   * @param {boolean} isClicking - State if the mouse is clicking 
   */
  setIsClicking(isClicking: boolean) {
    this.isClicking = isClicking;
    this.mouseClicked$.next();
  }
}
