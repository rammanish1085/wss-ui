import { TestBed } from '@angular/core/testing';

import { GobalutilityService } from './gobalutility.service';

describe('GobalutilityService', () => {
  let service: GobalutilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GobalutilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
