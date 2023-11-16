import { Component, Input, OnChanges, OnInit, SecurityContext, SimpleChanges } from '@angular/core';
import { Board } from 'src/app/models/project.model';
import { ProjectBoardPopupActionComponent } from '../project-board-popup-action/project-board-popup-action.component';
import { MatDialog } from '@angular/material/dialog';

import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";


@Component({
	selector: 'project-board',
	templateUrl: './project-board.component.html',
	styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent implements OnInit, OnChanges {
	content_or_link: any;
	@Input({ required: true }) projectId!: string;
	@Input({ required: true }) boardItem!: Board;

	constructor(
		public sanitizer: DomSanitizer,
		private dialog: MatDialog
	) { }

	ngOnInit(): void {
		this._setBoardDisplay();
	}

	ngOnChanges(changes: SimpleChanges) {
		this._setBoardDisplay();
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

	noPropagationClick(evt: Event): void {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
	}

	_setBoardDisplay(): void {
		if (this.boardItem.boardType === "LINKED") {
			this.content_or_link = this.sanitizer.bypassSecurityTrustResourceUrl(this.boardItem.boardContent);
		}
		else {
			this.content_or_link = this.boardItem.boardContent;
		}
	}
}
