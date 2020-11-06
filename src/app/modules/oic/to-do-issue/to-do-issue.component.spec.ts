import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoIssueComponent } from './to-do-issue.component';

describe('ToDoIssueComponent', () => {
  let component: ToDoIssueComponent;
  let fixture: ComponentFixture<ToDoIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDoIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
