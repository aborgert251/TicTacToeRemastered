import { Directive, Input, ElementRef } from '@angular/core';
import { MouseService } from '../services/mouse.service';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  isHovering: boolean = false;

  @Input() cardId!: number;

  @Input() notifyMouseService: boolean = true;

  constructor(private element: ElementRef<HTMLElement>, private mouseService: MouseService) {
    this.mouseService.positionUpdated$.subscribe(() => {
      if(this.checkHover(element.nativeElement.getBoundingClientRect())) {
        this.isHovering = true;
        this.element.nativeElement.classList.add('hovering');

        if(this.notifyMouseService) {
          this.mouseService.hoveringCardId[this.cardId] = true;
        }
      } else {
        this.isHovering = false;
        this.element.nativeElement.classList.remove('hovering');

        if(this.notifyMouseService) {
          this.mouseService.hoveringCardId[this.cardId] = false;
        }
      };
    });
  }

  private checkHover({ x, y, width, height }: {x: number, y: number, width: number, height: number}): boolean {
    const mousePosX = this.mouseService.posX;
    const mousePosY = this.mouseService.posY;

    return x <= mousePosX && mousePosX <= x + width && y <= mousePosY && mousePosY <= y + height;
  }

}
