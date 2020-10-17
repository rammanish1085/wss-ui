import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackIssueComponent } from './track-issue.component';

describe('TrackIssueComponent', () => {
  let component: TrackIssueComponent;
  let fixture: ComponentFixture<TrackIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
