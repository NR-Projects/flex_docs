import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from 'src/app/models/project.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectPopupModifyComponent } from '../project-popup-modify/project-popup-modify.component';
import { Router } from '@angular/router';

@Component({
	selector: 'project-item',
	templateUrl: './project-item.component.html',
	styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
	@Input({ required: true }) projectItem!: Project;

	itemName?: string;
	itemTag?: string;

	constructor(
		private dialog: MatDialog,
		private router: Router,
		private authService: AuthService
	) { }

	async ngOnInit(): Promise<void> {
		this.itemName = this.projectItem.name;

		// Check matching id
		const user_id = await this.authService.getUserId();

		this.itemTag = "Shared";
		if (user_id === this.projectItem.owner_id!) {
			this.itemTag = "Owned";
		}
	}

	onProjectEditInvoked(): void {
		this.dialog.open(ProjectPopupModifyComponent, {
			disableClose: true,
			data: {
				type: "Edit",
				projectData: this.projectItem
			},
		});
	}

	onProjectDeleteInvoked(): void {
		this.dialog.open(ProjectPopupModifyComponent, {
			disableClose: true,
			data: {
				type: "Delete",
				projectData: this.projectItem
			},
		});
	}

	onProjectView(): void {
		this.router.navigate([`project/${this.projectItem.id}`]);
	}
}
