import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AuthGuard } from './auth.guard';
import { ProjectViewComponent } from './components/project-view/project-view.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full',	
	},
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'projects',
		component: ProjectsComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'project/:id',
		component: ProjectViewComponent,
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
