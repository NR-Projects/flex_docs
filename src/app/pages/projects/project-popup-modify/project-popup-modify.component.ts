import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/app/models/project.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
	selector: 'project-popup-modify',
	templateUrl: './project-popup-modify.component.html',
	styleUrls: ['./project-popup-modify.component.scss']
})
export class ProjectPopupModifyComponent implements OnInit {
	popupType: string;
	popupData: Project;
	popupFormEnabled: boolean;

	popupTitle?: string;

	projectInfoFormGroup = this.formBuilder.group({
		ProjectName: ['', Validators.required],
	});


	constructor(
		@Inject(MAT_DIALOG_DATA) private data: any,
		private dialogRef: MatDialogRef<ProjectPopupModifyComponent>,
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private projectService: ProjectService
	) {
		this.popupType = data.type;
		this.popupData = data.projectData;
		this.popupFormEnabled = true;
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
					this.projectInfoFormGroup.setValue({
						ProjectName: this.popupData.name!
					});
				}
				break;
			case "Delete":
				{
					this.popupTitle = "Delete this Project?";
					this.projectInfoFormGroup.setValue({
						ProjectName: this.popupData.name!
					});
					this.popupFormEnabled = false;
				}
				break;
		}
	}

	async onProjectActionInvoked(): Promise<void> {

		if (!this.projectInfoFormGroup.valid) {
			return;
		}

		switch (this.popupType) {
			case "Add":
				{
					// Get All Info From Form Group
					const ProjectName = this.projectInfoFormGroup.get("ProjectName")?.value as string;

					// Cancel if cannot fetch id !== null
					const user_id = await this.authService.getUserId();
					if (user_id === '') return;

					// Create New Project Object
					let newProject: Project = {
						name: ProjectName,
						owner_id: user_id,
						shared_access: {}
					}

					// Push to Firestore
					await this.projectService.addProject(newProject);
				}
				break;
			case "Edit":
				{
					// Get All Info From Form Group
					const ProjectName = this.projectInfoFormGroup.get("ProjectName")?.value as string;

					// Modify Existing Project Object
					this.popupData.name = ProjectName;

					// Push to Firestore
					await this.projectService.updateProject(this.popupData);
				}
				break;
			case "Delete":
				{
					// Delete from Firestore
					await this.projectService.deleteProject(this.popupData);
				}
				break;
		}

		// Close Popup
		this.dialogRef.close();
	}
}
