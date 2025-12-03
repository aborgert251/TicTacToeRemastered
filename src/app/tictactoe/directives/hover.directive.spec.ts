import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { HoverDirective } from './hover.directive';
import { MouseService } from '../services/mouse.service';
import { Subject } from 'rxjs';

describe('HoverDirective', () => {

  let elementRefMock: ElementRef;
  let mouseServiceMock: MouseService;

  beforeEach(() => {
    elementRefMock = {
      nativeElement: document.createElement('div')
    } as ElementRef;

    mouseServiceMock = {
      positionUpdated$: new Subject<void>(),
      posX: 0,
      posY: 0,
      hoveringCardId: {}
    } as any;

    TestBed.configureTestingModule({
      providers: [
        { provide: ElementRef, useValue: elementRefMock },
        { provide: MouseService, useValue: mouseServiceMock },
        HoverDirective
      ]
    });
  });

  it('should create an instance', () => {
    const directive = TestBed.inject(HoverDirective);
    expect(directive).toBeTruthy();
  });

});