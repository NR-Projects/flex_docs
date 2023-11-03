import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Project } from '../models/project.model';
import { Observable, lastValueFrom, map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProjectService {

	constructor(private firestore: Firestore) { }

	async addProject(project: Project): Promise<void> {
		let projectCollection = collection(this.firestore, "projects");
		addDoc(projectCollection, project);
	}

	getAllProjects(): Observable<Array<Project>> {
		let projectCollection = collection(this.firestore, "projects");
		return collectionData(projectCollection, { idField: 'id'}).pipe(map((response) => {
			return response as Array<Project>;
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
}
