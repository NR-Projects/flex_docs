import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

// External
import { NgxTypedJsModule } from 'ngx-typed-js';
import { KtdGridModule } from '@katoid/angular-grid-layout';

import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectItemComponent } from './pages/projects/project-item/project-item.component';
import { ProjectPopupModifyComponent } from './pages/projects/project-popup-modify/project-popup-modify.component';
import { ProjectViewComponent } from './pages/project-view/project-view.component';
import { ProjectBoardComponent } from './pages/project-view/project-board/project-board.component';
import { ProjectBoardPopupActionComponent } from './pages/project-view/project-board-popup-action/project-board-popup-action.component';


const firebaseConfig = {
	"projectId": "flex-docs-c1875",
	"appId": "1:1084485850333:web:c3febdf7df021ec98df734",
	"storageBucket": "flex-docs-c1875.appspot.com",
	"apiKey": "AIzaSyCM7aiMCoC-tvPijku65Jz7avwlZRMBt9c",
	"authDomain": "flex-docs-c1875.firebaseapp.com",
	"messagingSenderId": "1084485850333",
	"measurementId": "G-F7ZYCX83HS"
};


@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		ProjectsComponent,
		ProjectItemComponent,
		ProjectPopupModifyComponent,
		ProjectViewComponent,
		ProjectBoardComponent,
		ProjectBoardPopupActionComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,

		// Angular Material
		MatButtonModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatMenuModule,
		MatIconModule,
		MatSelectModule,
		MatTooltipModule,

		// Firebase
		provideFirebaseApp(() => initializeApp(firebaseConfig)),
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore()),

		// External
		NgxTypedJsModule,
		KtdGridModule
	],
	providers: [
		ScreenTrackingService,
		UserTrackingService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
