import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPopupModifyComponent } from './project-popup-modify.component';

describe('ProjectPopupModifyComponent', () => {
  let component: ProjectPopupModifyComponent;
  let fixture: ComponentFixture<ProjectPopupModifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectPopupModifyComponent]
    });
    fixture = TestBed.createComponent(ProjectPopupModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
