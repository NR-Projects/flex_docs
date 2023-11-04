import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBoardPopupActionComponent } from './project-board-popup-action.component';

describe('ProjectBoardPopupActionComponent', () => {
  let component: ProjectBoardPopupActionComponent;
  let fixture: ComponentFixture<ProjectBoardPopupActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectBoardPopupActionComponent]
    });
    fixture = TestBed.createComponent(ProjectBoardPopupActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
