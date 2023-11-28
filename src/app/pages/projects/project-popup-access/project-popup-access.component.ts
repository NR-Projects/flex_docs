import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectPopupModifyComponent } from '../project-popup-modify/project-popup-modify.component';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Project, UserAccess } from 'src/app/models/project.model';

@Component({
	selector: 'app-project-popup-access',
	templateUrl: './project-popup-access.component.html',
	styleUrls: ['./project-popup-access.component.scss']
})
export class ProjectPopupAccessComponent implements OnInit {
	popupProject: Project;
	popupTitle?: string;

	// Public UAC
	projectPublicUserAccessFormGroup = this.formBuilder.group({
		publicAccess: ['', Validators.required]
	})

	// Authenticated UAC
	projectAuthUserAccessInfoFormGroup = this.formBuilder.group({
		userAccessList: this.formBuilder.array([])
	});

	get userAccessListControl(): FormArray {
		return this.projectAuthUserAccessInfoFormGroup.get("userAccessList") as FormArray;
	}

	constructor(
		@Inject(MAT_DIALOG_DATA) private data: any,
		private dialogRef: MatDialogRef<ProjectPopupModifyComponent>,
		private formBuilder: FormBuilder,
		private projectService: ProjectService
	) {
		this.popupProject = data.projectObj;
	}

	ngOnInit(): void {
		// Public UAC
		// Get Public Access Info
		this.projectPublicUserAccessFormGroup.setValue( {
			publicAccess: this.popupProject.is_public,
		})

		// Authenticated UAC
		// Get Shared Access and display
		for (const [key, value] of Object.entries(this.popupProject.shared_access)) {
			const uid = key as string;
			const { tag, access_type } = value as UserAccess;
			this.userAccessListControl.push(
				this.formBuilder.group({
					tag: [tag, [Validators.required]],
					uid: [uid, [Validators.required]],
					access: [access_type, [Validators.required]]
				})
			);
		}
	}

	addNewFormGroup(): void {
		this.userAccessListControl.push(
			this.formBuilder.group({
				tag: [null, [Validators.required]],
				uid: [null, [Validators.required]],
				access: [null, [Validators.required]]
			})
		);
	}

	removeFormGroup(index: number): void {
		this.userAccessListControl.removeAt(index);
	}

	async onProjectActionInvoked(): Promise<void> {
		// Public UAC
		let is_public = this.projectPublicUserAccessFormGroup.get('publicAccess')?.value!;

		this.popupProject.is_public = is_public;

		// Authenticated UAC
		let access_record: Record<string, UserAccess> = {};

		for (let fc of this.userAccessListControl.controls) {
			// Get UserId + UserAccess of each group
			const tag = fc.get('tag')?.value as string;
			const user_id = fc.get('uid')?.value as string;
			const access = fc.get('access')?.value as string;

			// Add to Record
			access_record[user_id] = {
				tag: tag,
				access_type: access
			};
		}

		// Update shared_access of project
		this.popupProject.shared_access = access_record;

		// Push to firebase
		await this.projectService.updateProject(this.popupProject);

		// Close Popup
		this.dialogRef.close();
	}
}
