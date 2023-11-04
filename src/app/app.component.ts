import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'flex_docs';

	constructor(
		private authService: AuthService,
		private router: Router) {
	}

	async ngOnInit(): Promise<void> {
		const [isLoggedIn, _] = await this.authService.getUserIfExists();

		if (isLoggedIn && this.router.url === '/home') {
			this.router.navigate(['projects']);
		}
	}
}
