import { Component, Input, OnChanges, OnInit, SecurityContext, SimpleChanges } from '@angular/core';
import { Board } from 'src/app/models/project.model';
import { ProjectBoardPopupActionComponent } from '../project-board-popup-action/project-board-popup-action.component';
import { MatDialog } from '@angular/material/dialog';

import { DomSanitizer } from "@angular/platform-browser";
import { BoardService } from 'src/app/services/board.service';


@Component({
	selector: 'project-board',
	templateUrl: './project-board.component.html',
	styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent implements OnInit, OnChanges {
	content_or_link: any;
	@Input({ required: true }) projectId!: string;
	@Input({ required: true }) boardItem!: Board;

	// For "Static" Only
	show_board_update_ui: boolean = false;
	updated_content: string = "";

	constructor(
		private projectBoardService: BoardService,
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

	// For "Static" Only
	onContentUpdated(newBoardContent: string): void {
		if (this.boardItem.boardContent === newBoardContent) {
			this.show_board_update_ui = false;
		}
		else {
			// Show UI for Updating Board Content
			this.show_board_update_ui = true;
			this.updated_content = newBoardContent;
		}
	}

	async onImmediateBoardUpdate(): Promise<void> {
		this.boardItem.boardContent = this.updated_content;
		await this.projectBoardService.updateProjectBoard(this.projectId, this.boardItem);
		this.show_board_update_ui = false;
		alert(`Contents are updated! -> Board: ${this.boardItem.name}`);
	}
}
