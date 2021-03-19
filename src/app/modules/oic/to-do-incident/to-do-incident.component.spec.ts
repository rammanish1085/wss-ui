import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoIncidentComponent } from './to-do-incident.component';

describe('ToDoIncidentComponent', () => {
  let component: ToDoIncidentComponent;
  let fixture: ComponentFixture<ToDoIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoIncidentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
