import { TestBed } from '@angular/core/testing';

import { IssueMasterService } from './issue-master.service';

describe('IssueMasterService', () => {
  let service: IssueMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssueMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
