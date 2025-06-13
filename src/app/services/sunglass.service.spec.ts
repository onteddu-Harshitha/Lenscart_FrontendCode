import { TestBed } from '@angular/core/testing';

import { SunglassService } from './sunglass.service';

describe('SunglassService', () => {
  let service: SunglassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SunglassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
