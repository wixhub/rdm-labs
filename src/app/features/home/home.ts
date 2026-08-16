import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../core/services/project.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly projectService = inject(ProjectService);

  // Expose the projects directly from the underlying httpResource value
  readonly projects = this.projectService.projectsResource.value;

  // Expose the loading state directly from the underlying httpResource status
  readonly isLoading = this.projectService.projectsResource.isLoading;
}
