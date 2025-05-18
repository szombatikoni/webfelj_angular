import { TestBed } from '@angular/core/testing';

import { LekerdezesService } from './lekerdezes.service';

describe('LekerdezesService', () => {
  let service: LekerdezesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LekerdezesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
