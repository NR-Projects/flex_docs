import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'home-component',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor(
		private authService: AuthService,
		private router: Router
		) {
	}

	ngOnInit(): void {
	}

	async onGoogleAuthClicked(): Promise<void> {
		await this.authService.login();
		this.router.navigate(['projects']);
	}
}
