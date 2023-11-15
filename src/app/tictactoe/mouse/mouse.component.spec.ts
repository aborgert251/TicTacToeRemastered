import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouseComponent } from './mouse.component';

describe('MouseComponent', () => {
  let component: MouseComponent;
  let fixture: ComponentFixture<MouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
