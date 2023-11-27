import { ElementRef } from '@angular/core';
import { MouseService } from '../services/mouse.service';
import { HoverDirective } from './hover.directive';
import { Subject } from 'rxjs';

describe('HoverDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = {} as ElementRef;
    const mouseServiceMock = {
      positionUpdated$: new Subject<void>
    } as MouseService;

    const directive = new HoverDirective(elementRefMock, mouseServiceMock);
    expect(directive).toBeTruthy();
  });
});
