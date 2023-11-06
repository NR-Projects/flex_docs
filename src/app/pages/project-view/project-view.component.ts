import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { KtdGridLayout, KtdGridLayoutItem, ktdTrackById } from '@katoid/angular-grid-layout';
import { Subscription } from 'rxjs';
import { Board, Project } from 'src/app/models/project.model';
import { BoardService } from 'src/app/services/board.service';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectBoardPopupActionComponent } from './project-board-popup-action/project-board-popup-action.component';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectEnterPopupComponent } from './project-enter-popup/project-enter-popup.component';

@Component({
	selector: 'app-project-view',
	templateUrl: './project-view.component.html',
	styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit, OnDestroy {

	// Project and Board Info
	projectId?: string;
	projectTitle?: string;
	projectData?: Project;
	projectBoards: Array<Board>;
	projectSub?: Subscription;
	projectBoardsSub?: Subscription;

	// For Grid
	isLayoutChanged: boolean;

	cols: number = 55;
	rowHeight: number | "fit" = 25;
	layout: KtdGridLayout = [];
	trackById = ktdTrackById;

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private dialog: MatDialog,
		private authService: AuthService,
		private projectService: ProjectService,
		private projectBoardService: BoardService
	) {
		this.isLayoutChanged = false;
		this.projectBoards = [];
	}

	async ngOnInit(): Promise<void> {
		const user_id = await this.authService.getUserId();

		// Get Id from Url
		this.projectId = this.activatedRoute.snapshot.paramMap.get('id')!;

		// Get Project Info (From Id)
		this.projectSub = this.projectService.getProject(this.projectId!).subscribe({
			next: (project: Project) => {
				this.projectData = project;
				this.projectTitle = this.projectData.name!;

				// Show Dialog [Conditional]
				if (this.projectData!.owner_id !== user_id) {
					this.dialog.open(ProjectEnterPopupComponent, {
						disableClose: true,
						data: {
							isAllowed: true,
							accessType: this.projectData?.shared_access[user_id]
						},
					});
				}
			},
			error: (err: any) => {
				console.error(err);
				this.dialog.open(ProjectEnterPopupComponent, {
					disableClose: true,
					data: {
						isAllowed: false
					},
				});
				this.router.navigate(['projects']);
			}
		});

		// Get Project Board (From Id + Project Id)
		this._refreshBoardAction();
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
			if (!isVecSame) {
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

		alert("Boards successfully synced to server!");
	}

	onReloadBoardsEvent(): void {
		this._refreshBoardAction();
		alert("Boards are already refreshed!");
	}


	_refreshBoardAction(): void {
		this.projectBoardsSub?.unsubscribe();
		this.projectBoardsSub = this.projectBoardService.getAllProjectBoards(this.projectId!).subscribe({
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
}
