import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectService } from '../../core/services/project.service';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);

  // Convert route parameters into a reactive signal automatically
  private readonly routeParams = toSignal(this.route.paramMap);

  // Derive the loading state directly from the underlying httpResource status
  readonly isLoading = this.projectService.projectsResource.isLoading;

  // Compute the specific project reactively based on the route ID and resource value
  readonly project = computed(() => {
    const id = this.routeParams()?.get('id');
    const projects = this.projectService.projectsResource.value();

    if (!id || !projects) return null;
    return projects.find((p) => p.id === id) ?? null;
  });
}
