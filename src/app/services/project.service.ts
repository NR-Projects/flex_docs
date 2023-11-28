import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, query, updateDoc, where } from '@angular/fire/firestore';
import { Board, Project } from '../models/project.model';
import { Observable, firstValueFrom, map } from 'rxjs';
import { BoardService } from './board.service';

@Injectable({
	providedIn: 'root'
})
export class ProjectService {

	constructor(private firestore: Firestore,
		private boardService: BoardService) { }

	async addProject(project: Project): Promise<void> {
		let projectCollection = collection(this.firestore, "projects");
		await addDoc(projectCollection, project);
	}

	getAllProjects(user_id: string): Observable<Array<Project>> {
		let projectCollection = collection(this.firestore, "projects");
		let filterByOwnerId = query(projectCollection, where("owner_id", "==", user_id));
		return collectionData(filterByOwnerId, { idField: 'id' }).pipe(map((response) => {
			return response as Array<Project>;
		}));
	}

	getProject(id: string): Observable<Project> {
		let docRef = doc(this.firestore, "projects", id);
		return docData(docRef, { idField: 'id' }).pipe(map((response) => {
			return response as Project;
		}));
	}

	async updateProject(project: Project): Promise<void> {
		let docRef = doc(this.firestore, "projects", project.id!);
		delete project.id;
		await updateDoc(docRef, JSON.parse(JSON.stringify(project)));
	}

	async deleteProject(project: Project): Promise<void> {
		// Delete all under boards
		let boardsPromise = await firstValueFrom(this.boardService.getAllProjectBoards(project.id!));
		boardsPromise.forEach(async board => {
			// Delete Board
			await this.boardService.deleteProjectBoard(project.id!, board);
		});

		// Delete Project
		let docRef = doc(this.firestore, "projects", project.id!);
		await deleteDoc(docRef);
	}
}
