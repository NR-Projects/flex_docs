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
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectItemComponent } from './components/projects/project-item/project-item.component';
import { ProjectPopupModifyComponent } from './components/projects/project-popup-modify/project-popup-modify.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		ProjectsComponent,
		ProjectItemComponent,
		ProjectPopupModifyComponent
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
		NgxTypedJsModule
	],
	providers: [
		ScreenTrackingService,
		UserTrackingService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
