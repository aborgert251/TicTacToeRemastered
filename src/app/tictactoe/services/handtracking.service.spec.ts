import { TestBed } from '@angular/core/testing';

import { HandTrackingService } from './handtracking.service';

describe('GameService', () => {
  let service: HandTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
