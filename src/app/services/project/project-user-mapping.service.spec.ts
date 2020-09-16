import { TestBed } from '@angular/core/testing';

import { ProjectUserMappingService } from './project-user-mapping.service';

describe('ProjectUserMappingService', () => {
  let service: ProjectUserMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectUserMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
