import { TestBed } from '@angular/core/testing';

import { RequestInformationService } from './request-information.service';

describe('RequestInformationService', () => {
  let service: RequestInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
