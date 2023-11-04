import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, query, updateDoc, where } from '@angular/fire/firestore';
import { Project } from '../models/project.model';
import { Observable, map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProjectService {

	constructor(private firestore: Firestore) { }

	// Project
	async addProject(project: Project): Promise<void> {
		let projectCollection = collection(this.firestore, "projects");
		addDoc(projectCollection, project);
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
		let docRef = doc(this.firestore, "projects", project.id!);
		await deleteDoc(docRef);
	}

	// Board
}
