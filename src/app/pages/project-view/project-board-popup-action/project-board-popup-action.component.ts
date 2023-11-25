import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectPopupModifyComponent } from '../../projects/project-popup-modify/project-popup-modify.component';
import { BoardService } from 'src/app/services/board.service';
import { Board } from 'src/app/models/project.model';

@Component({
	selector: 'app-project-board-popup-action',
	templateUrl: './project-board-popup-action.component.html',
	styleUrls: ['./project-board-popup-action.component.scss']
})
export class ProjectBoardPopupActionComponent implements OnInit {
	
	popupType: string;
	popupProjectId: string;
	popupData: Board;
	popupFormEnabled: boolean;

	// For Board Creation
	popupMaxHeight: number;

	popupTitle?: string;
	boardInfoFormGroup = this.formBuilder.group({
		BoardName: ['', Validators.required],
		BoardType: ['', Validators.required],
		BoardContent: ['', Validators.required]
	});

	constructor(
		@Inject(MAT_DIALOG_DATA) private data: any,
		private dialogRef: MatDialogRef<ProjectPopupModifyComponent>,
		private formBuilder: FormBuilder,
		private projectBoardService: BoardService
	) {
		this.popupType = data.type;
		this.popupProjectId = data.projectId;
		this.popupData = data.boardData;
		this.popupFormEnabled = true;
		this.popupMaxHeight = data.maxHeight;
	}

	ngOnInit(): void {
		switch (this.popupType) {
			case "Add":
				{
					this.popupTitle = "Add New Project";
				}
				break;
			case "Edit":
				{
					this.popupTitle = "Edit Project";
					this.boardInfoFormGroup.setValue({
						BoardName: this.popupData.name,
						BoardType: this.popupData.boardType,
						BoardContent: this.popupData.boardContent
					});
				}
				break;
			case "Delete":
				{
					this.popupTitle = "Delete this Project?";
					this.boardInfoFormGroup.setValue({
						BoardName: this.popupData.name,
						BoardType: this.popupData.boardType,
						BoardContent: this.popupData.boardContent
					});
					this.popupFormEnabled = false;
				}
				break;
		}
	}

	async onBoardActionInvoked(): Promise<void> {
		if (!this.boardInfoFormGroup.valid) {
			return;
		}

		switch (this.popupType) {
			case "Add":
				{
					// Get All Info From Form Group
					const BoardName = this.boardInfoFormGroup.get("BoardName")?.value as string;
					const BoardType = this.boardInfoFormGroup.get("BoardType")?.value as string;
					const BoardContent = this.boardInfoFormGroup.get("BoardContent")?.value as string;

					// Create New Board Object
					let newBoard: Board = new Board(
						BoardName,
						BoardType,
						BoardContent
					);

					// Apply maxHeight (so that it will not disturb other boards positioning)
					newBoard.pos.y = this.popupMaxHeight;

					// Push to Firestore
					await this.projectBoardService.addProjectBoard(this.popupProjectId, newBoard);
				}
				break;
			case "Edit":
				{
					// Get All Info From Form Group
					const BoardName = this.boardInfoFormGroup.get("BoardName")?.value as string;
					const BoardType = this.boardInfoFormGroup.get("BoardType")?.value as string;
					const BoardContent = this.boardInfoFormGroup.get("BoardContent")?.value as string;

					// Modify Existing Project Object
					this.popupData.name = BoardName;
					this.popupData.boardType = BoardType;
					this.popupData.boardContent = BoardContent;

					// Push to Firestore
					await this.projectBoardService.updateProjectBoard(this.popupProjectId, this.popupData);
				}
				break;
			case "Delete":
				{
					// Delete from Firestore
					await this.projectBoardService.deleteProjectBoard(this.popupProjectId, this.popupData);
				}
				break;
		}

		// Close Popup
		this.dialogRef.close();
	}
}
