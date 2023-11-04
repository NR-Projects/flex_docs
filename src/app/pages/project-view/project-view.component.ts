import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KtdGridLayout, KtdGridLayoutItem, ktdTrackById } from '@katoid/angular-grid-layout';
import { Subscription } from 'rxjs';
import { Board, BoardType, Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
	selector: 'app-project-view',
	templateUrl: './project-view.component.html',
	styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit, OnDestroy {

	b_count: number = 0;
	// Project and Board Info
	projectData?: Project;
	projectBoards: Array<Board>;
	projectBoardsSub?: Subscription;

	// For Grid
	cols: number = 50;
	rowHeight: number | "fit" = 20;
	layout: KtdGridLayout = [];
	trackById = ktdTrackById;

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private projectService: ProjectService
	) {
		this.projectBoards = [];
	}

	ngOnInit(): void {
		// Get Id from Url
		const projectId: string = this.activatedRoute.snapshot.paramMap.get('id')!;

		// Get Project Info (From Id)
		this.projectService.getProject(projectId).subscribe({
			next: (project: Project) => {
				this.projectData = project;
			},
			error: (err: any) => console.error(err)
		}).unsubscribe();

		// Get Project Board (From Id + Project Id)

		this.onCreateBoardEvent();
	}

	ngOnDestroy(): void {
		//
	}

	backToProjects() {
		this.router.navigate(['projects']);
	}

	onLayoutUpdated(layout: KtdGridLayout) {
		this.layout = layout;

		// For each update of layout, sync data to the board models
		for (let board of this.projectBoards) {
			const layoutItem = this.layout.find(layout => layout.id === board.id);
			if (layoutItem) {
				board.pos.x = layoutItem.x;
				board.pos.y = layoutItem.y;
				board.size.x = layoutItem.w;
				board.size.y = layoutItem.h;
			}
		}
	}

	onCreateBoardEvent(): void {
		const new_board = new Board(this.b_count.toString(), 'Placeholder_Name', BoardType.STATIC);

		// Push to Board Array
		this.projectBoards.push(new_board);

		// Push to Layout
		const item: KtdGridLayoutItem = {
			id: new_board.id,
			x: new_board.pos.x, y: new_board.pos.y,
			w: new_board.size.x, h: new_board.size.y,
			minW: new_board.min_size.x, minH: new_board.min_size.y
		};
		this.layout = [
			item,
			...this.layout
		];

		// Increment Counter <DEBUG ONLY>
		this.b_count++;
	}
}
