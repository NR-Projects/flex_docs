import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'projects-component',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
	userName: any;
	userImage: any;

	constructor(
		private authService: AuthService
	) {}

	async ngOnInit(): Promise<void> {
		const [isLoggedIn, user] = await this.authService.getUserIfExists();

		if (!isLoggedIn) return;

		// Setup Personal Properties
		this.userName = user?.displayName;
		this.userImage = user?.photoURL;
	}

	async logOut(): Promise<void> {
		await this.authService.logout();
	}
}
