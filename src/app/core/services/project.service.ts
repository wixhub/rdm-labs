import { Service, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Project } from '../models/project.model';

@Service()
export class ProjectService {
  // Reactive signal to store the currently selected project ID
  private readonly selectedProjectId = signal<string | null>(null);

  // Main resource for loading all projects list
  public readonly projectsResource = httpResource<Project[]>(() => 'data/projects.json', {
    defaultValue: [],
  });

  // Dynamic resource that fetches project details based on the selected ID signal reactivity
  public readonly projectDetailsResource = httpResource<Partial<Project>>(
    () => {
      const id = this.selectedProjectId();
      return id ? `data/projects/${id}.json` : undefined; // Skips fetching if ID is not set
    },
    {
      defaultValue: {},
    },
  );

  // Action method to trigger dynamic details loading by updating the signal
  public selectProject(id: string): void {
    this.selectedProjectId.set(id);
  }
}
