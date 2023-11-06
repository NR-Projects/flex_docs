import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEnterPopupComponent } from './project-enter-popup.component';

describe('ProjectEnterPopupComponent', () => {
  let component: ProjectEnterPopupComponent;
  let fixture: ComponentFixture<ProjectEnterPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectEnterPopupComponent]
    });
    fixture = TestBed.createComponent(ProjectEnterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
