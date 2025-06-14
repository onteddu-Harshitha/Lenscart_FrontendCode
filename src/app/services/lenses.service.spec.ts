import { TestBed } from '@angular/core/testing';

import { LensesService } from './lenses.service';

describe('LensesService', () => {
  let service: LensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
