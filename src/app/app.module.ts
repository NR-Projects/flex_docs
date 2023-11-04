import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

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

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		ProjectsComponent,
		ProjectItemComponent,
		ProjectPopupModifyComponent,
		ProjectViewComponent,
		ProjectBoardComponent
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

		// Firebase
		provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
		provideAuth(() => getAuth()),
		provideAnalytics(() => getAnalytics()),
		provideFirestore(() => getFirestore()),
		provideStorage(() => getStorage()),

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
