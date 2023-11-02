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

	ngOnInit(): void {
		setTimeout(() => {
			const [isLoggedIn, _] = this.authService.getUserIfExists();

			console.log(this.authService.getUserIfExists());

			if (isLoggedIn) {
				this.router.navigate(['projects']);
			}
		}, 1000);
	}
}
