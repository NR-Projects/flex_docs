import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPopupAccessComponent } from './project-popup-access.component';

describe('ProjectPopupAccessComponent', () => {
  let component: ProjectPopupAccessComponent;
  let fixture: ComponentFixture<ProjectPopupAccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectPopupAccessComponent]
    });
    fixture = TestBed.createComponent(ProjectPopupAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
