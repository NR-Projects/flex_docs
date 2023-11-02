import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

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

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		ProjectsComponent,
		ProjectItemComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,

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
