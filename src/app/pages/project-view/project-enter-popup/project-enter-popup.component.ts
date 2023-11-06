import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectPopupModifyComponent } from '../../projects/project-popup-modify/project-popup-modify.component';

@Component({
	selector: 'app-project-enter-popup',
	templateUrl: './project-enter-popup.component.html',
	styleUrls: ['./project-enter-popup.component.scss']
})
export class ProjectEnterPopupComponent implements OnInit {
	popupContent: any;
	popupIsAllowed: boolean;
	popupAccessString: string;

	constructor(
		@Inject(MAT_DIALOG_DATA) private data: any,
		private dialogRef: MatDialogRef<ProjectPopupModifyComponent>
	) {
		this.popupIsAllowed = data.isAllowed;
		this.popupAccessString = data.accessType
	}

	ngOnInit(): void {
		if (!this.popupIsAllowed) {
			this.popupContent = "You are not authorized to view the project, please inform project owner to add you on shared access";
			return;
		}

		this.popupContent = `You have been given access to view this project, Access Type is set to ${this.popupAccessString}`;
	}
}
