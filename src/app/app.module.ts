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
import { ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

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
import { ProjectPopupAccessComponent } from './pages/projects/project-popup-access/project-popup-access.component';
import { ProjectEnterPopupComponent } from './pages/project-view/project-enter-popup/project-enter-popup.component';


const firebaseConfig = {
	"projectId": "flex-docs-c6b8d",
	"appId": "1:952002896749:web:dcdf177582e1a2739ef064",
	"storageBucket": "flex-docs-c6b8d.appspot.com",
	"apiKey": "AIzaSyAH-BxIcWXCUdjRM3gwXfD8mDA3b-9G7ug",
	"authDomain": "flex-docs-c6b8d.firebaseapp.com",
	"messagingSenderId": "952002896749",
	"measurementId": "G-QEE7SPNKLM"
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
		ProjectPopupAccessComponent,
		ProjectEnterPopupComponent,
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
		KtdGridModule,
	],
	providers: [
		ScreenTrackingService,
		UserTrackingService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
