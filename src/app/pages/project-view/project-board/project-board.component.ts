import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/app/models/project.model';

@Component({
	selector: 'project-board',
	templateUrl: './project-board.component.html',
	styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent implements OnInit {
	@Input({ required: true }) boardItem!: Board;

	constructor () {}

	ngOnInit(): void {
		// Display Item
	}

	onBoardEdit(): void {}

	onBoardDelete(): void {}
}
