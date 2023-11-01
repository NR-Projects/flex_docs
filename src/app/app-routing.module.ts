import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';

const routes: Routes = [
	{
		path: '/',
		redirectTo: '/home',
		component: AppComponent
	},
	{
		path: '/home',
		component: HomeComponent
	},
	{
		path: '/projects',
		component: ProjectsComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
