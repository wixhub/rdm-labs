import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  // Signal-based HTTP resource featuring built-in reactivity and automatic error mapping
  readonly projectsResource = httpResource<Project[]>(() => 'data/projects.json', {
    defaultValue: [],
  });

  // Fetch individual project detail dynamically using a reactive function wrapper for httpResource
  getProjectDetails(id: string) {
    return httpResource<Partial<Project>>(() => `data/projects/${id}.json`);
  }
}
