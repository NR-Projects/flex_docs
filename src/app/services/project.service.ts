import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private firestore: Firestore) { }

  addProject(project: Project) {
    //
  }

  getAllProject() {
    return [];
  }

  updateProject(project: Project) {}

  deleteProject(project: Project) {
    //
  }
}
