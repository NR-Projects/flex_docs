import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectPopupModifyComponent } from './project-popup-modify/project-popup-modify.component';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
	selector: 'projects-component',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
	userName: any;
	userImage: any;

	projectList: Array<Project>

	constructor(
		private router: Router,
		private authService: AuthService,
		public dialog: MatDialog,
		private projectService: ProjectService
	) {
		this.projectList = [];
	}

	async ngOnInit(): Promise<void> {
		const [isLoggedIn, user] = await this.authService.getUserIfExists();

		if (!isLoggedIn) return;

		// Setup Personal Properties
		this.userName = user?.displayName;
		this.userImage = user?.photoURL;

		// Fetch All projects
		this.projectList = this.projectService.getAllProject();
	}

	async logOut(): Promise<void> {
		await this.authService.logout();
		this.router.navigate(['home']);
	}

	onNewProject(): void {
		this.dialog.open(ProjectPopupModifyComponent, {
			disableClose: true,
			data: {
				type: "Add"
			},

			// Styles
			panelClass: "mat-dialog-def-style"
		});
	}
}
