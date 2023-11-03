import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, User, signInWithPopup, signOut } from '@angular/fire/auth';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private firebaseAuth: Auth) { }

	async login(): Promise<void> {
		await signInWithPopup(this.firebaseAuth, new GoogleAuthProvider());
	}

	async logout(): Promise<void> {
		await signOut(this.firebaseAuth);
	}

	async getUserIfExists(): Promise<[boolean, User | null]> {
		await this.firebaseAuth.authStateReady()
		return [
			this.firebaseAuth.currentUser !== null,
			this.firebaseAuth.currentUser
		];
	}

	async getUserId(): Promise<string> {
		await this.firebaseAuth.authStateReady();
		let currentUser = this.firebaseAuth.currentUser;
		if (currentUser === null) {
			alert("Please Reload!!");
			return '';
		}
		return currentUser.uid;
	}
}
