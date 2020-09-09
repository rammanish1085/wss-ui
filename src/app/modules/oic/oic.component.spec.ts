import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OicComponent } from './oic.component';

describe('OicComponent', () => {
  let component: OicComponent;
  let fixture: ComponentFixture<OicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
