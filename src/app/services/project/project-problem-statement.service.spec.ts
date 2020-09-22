import { TestBed } from '@angular/core/testing';

import { ProjectProblemStatementService } from './project-problem-statement.service';

describe('ProjectProblemStatementService', () => {
  let service: ProjectProblemStatementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectProblemStatementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
