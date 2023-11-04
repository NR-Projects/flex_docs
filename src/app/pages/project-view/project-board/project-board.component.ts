import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/app/models/project.model';
import { ProjectBoardPopupActionComponent } from '../project-board-popup-action/project-board-popup-action.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'project-board',
	templateUrl: './project-board.component.html',
	styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent implements OnInit {
	@Input({ required: true }) projectId!: string;
	@Input({ required: true }) boardItem!: Board;

	constructor (
		private dialog: MatDialog
	) {}

	ngOnInit(): void {
	}

	onBoardEdit(): void {
		this.dialog.open(ProjectBoardPopupActionComponent, {
			disableClose: true,
			data: {
				type: "Edit",
				projectId: this.projectId,
				boardData: this.boardItem
			},
		});
	}

	onBoardDelete(): void {
		this.dialog.open(ProjectBoardPopupActionComponent, {
			disableClose: true,
			data: {
				type: "Delete",
				projectId: this.projectId,
				boardData: this.boardItem
			},
		});
	}
}
