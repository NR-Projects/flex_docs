import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { KtdGridLayout, KtdGridLayoutItem, ktdTrackById } from '@katoid/angular-grid-layout';
import { Subscription } from 'rxjs';
import { Board, Project } from 'src/app/models/project.model';
import { BoardService } from 'src/app/services/board.service';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectBoardPopupActionComponent } from './project-board-popup-action/project-board-popup-action.component';

@Component({
	selector: 'app-project-view',
	templateUrl: './project-view.component.html',
	styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit, OnDestroy {

	// Project and Board Info
	projectData?: Project;
	projectBoards: Array<Board>;
	projectSub?: Subscription;
	projectBoardsSub?: Subscription;

	// For Grid
	isLayoutChanged: boolean;

	cols: number = 50;
	rowHeight: number | "fit" = 20;
	layout: KtdGridLayout = [];
	trackById = ktdTrackById;

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private dialog: MatDialog,
		private projectService: ProjectService,
		private projectBoardService: BoardService
	) {
		this.isLayoutChanged = false;
		this.projectBoards = [];
	}

	ngOnInit(): void {
		// Get Id from Url
		const projectId: string = this.activatedRoute.snapshot.paramMap.get('id')!;

		// Get Project Info (From Id)
		this.projectSub = this.projectService.getProject(projectId).subscribe({
			next: (project: Project) => {
				this.projectData = project;
			},
			error: (err: any) => console.error(err)
		});

		// Get Project Board (From Id + Project Id)
		this.projectBoardsSub = this.projectBoardService.getAllProjectBoards(projectId).subscribe({
			next: (value: Array<Board>) => {
				// Reset Arrays
				this.projectBoards = [];
				this.layout = [];

				value.forEach((board: Board) => {
					// Push to Board Array
					board._is_pos_changed = false;
					this.projectBoards.push(board);

					// Push to Layout
					const item: KtdGridLayoutItem = {
						id: board.id,
						x: board.pos.x, y: board.pos.y,
						w: board.size.x, h: board.size.y,
						minW: board.min_size.x, minH: board.min_size.y
					};
					this.layout = [
						item,
						...this.layout
					];
				});
			},
			error: (err: any) => console.error(err)
		});
	}

	ngOnDestroy(): void {
		this.projectSub?.unsubscribe();
		this.projectBoardsSub?.unsubscribe();
	}

	backToProjects(): void {
		this.router.navigate(['projects']);
	}

	onLayoutUpdated(layout: KtdGridLayout): void {
		this.isLayoutChanged = true;
		this.layout = layout;
		// For each update of layout, sync data to the board models
		for (let board of this.projectBoards) {
			const layoutItem = this.layout.find(layout => layout.id === board.id);

			if (!layoutItem) return;

			// Check if position changed
			const isVecSame = (
				board.pos.x === layoutItem.x &&
				board.pos.y === layoutItem.y &&
				board.size.x === layoutItem.w &&
				board.size.y === layoutItem.h
			);

			// Update Positions if changed
			if(!isVecSame) {
				board._is_pos_changed = true;

				board.pos.x = layoutItem.x;
				board.pos.y = layoutItem.y;
				board.size.x = layoutItem.w;
				board.size.y = layoutItem.h;
			}
		}
	}

	onCreateBoardEvent(): void {
		this.dialog.open(ProjectBoardPopupActionComponent, {
			disableClose: true,
			data: {
				type: "Add",
				projectId: this.projectData?.id
			},
		});
	}

	onSyncAllBoardPos(): void {
		if (!this.isLayoutChanged) {
			alert("Boards are currently synced!");
			return;
		}

		this.isLayoutChanged = false;

		this.projectBoards.forEach(async (projectBoard: Board) => {
			if (projectBoard._is_pos_changed) {
				await this.projectBoardService.updateProjectBoard(this.projectData!.id!, projectBoard);
			}
		});
	}
}
