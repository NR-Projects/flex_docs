import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, query, updateDoc, where } from '@angular/fire/firestore';
import { Board } from '../models/project.model';
import { Observable, map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class BoardService {

	constructor(private firestore: Firestore) { }

	async addProjectBoard(projectId: string, board: Board): Promise<void> {
		let projectBoardCollection = collection(this.firestore, "projects", projectId, "boards");
		await addDoc(projectBoardCollection, board);
	}

	getAllProjectBoards(user_id: string, projectId: string): Observable<Array<Board>> {
		let projectBoardCollection = collection(this.firestore, "projects", projectId, "boards");
		return collectionData(projectBoardCollection, { idField: 'id' }).pipe(map((response) => {
			return response as Array<Board>;
		}));
	}

	async updateProjectBoard(projectId: string, board: Board) {
		let docRef = doc(this.firestore, "projects", projectId, "boards", board.id);
		await updateDoc(docRef, JSON.parse(JSON.stringify(board)));
	}
	async deleteProjectBoard(projectId: string, board: Board) {
		let docRef = doc(this.firestore, "projects", projectId, "boards", board.id);
		await deleteDoc(docRef);
	}
}
