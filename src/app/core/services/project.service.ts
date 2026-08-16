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
}
