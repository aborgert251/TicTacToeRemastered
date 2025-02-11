import { Directive, Input, ElementRef, inject } from '@angular/core';
import { MouseService } from '../services/mouse.service';
import { BoundingBox } from '../interfaces/box.interface';

@Directive({
    selector: '[appHover]',
    standalone: true
})
export class HoverDirective {
  private element = inject<ElementRef<HTMLElement>>(ElementRef);
  private mouseService = inject(MouseService);


  /**
   * The cardId that is hovered.
   */
  @Input() cardId?: number;

  /**
   * Indication if the mouseService should be notified. By default it is notified.
   */
  @Input() notifyMouseService = true;

  /**
   * Checks on every mouse position update if the mouse is hovering the given element, sets the css class to indicate hovering state. It also notifies
   * the mouseService which card is hovered if needed and a cardId is given.
   * 
   * @param {ElementRef<HTMLElement>} element - The element the directive is bind to. 
   * @param {MouseService} mouseService - The service that handles all things around mouse movement, hovered objects etc. 
   */
  constructor() {
    const element = this.element;

    this.mouseService.positionUpdated$.subscribe(() => {
      const isHovering = this.checkHover(element.nativeElement.getBoundingClientRect());

      if(this.notifyMouseService && this.cardId !== undefined && this.cardId !== null) {
        this.mouseService.hoveringCardId[this.cardId] = isHovering;
      }

      if(isHovering) {
        return this.element.nativeElement.classList.add('hovering');
      }
      
      this.element.nativeElement.classList.remove('hovering');
    });
  }

/**
 * Checks if the mouse cursor is hovering over a specified area defined by the bounding box.
 *
 * @param {BoundingBox} boundingBox - The bounding box representing the area to be checked.
 * @returns {boolean} - Returns true if the mouse cursor is within the specified area, otherwise false.
 */
  private checkHover({ x, y, width, height }: BoundingBox): boolean {
    const mousePosX = this.mouseService.posX;
    const mousePosY = this.mouseService.posY;

    return x <= mousePosX && mousePosX <= x + width && y <= mousePosY && mousePosY <= y + height;
  }

}
