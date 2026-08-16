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

  // Convert route parameter map into a reactive signal automatically using toSignal
  private readonly routeParams = toSignal(this.route.paramMap);

  // Extract project ID reactively whenever route parameters update
  private readonly id = computed(() => this.routeParams()?.get('id') || '');

  // Fetch detailed project-specific data dynamically using the service
  private readonly details = this.projectService.getProjectDetails(this.id());

  // Combine base project information from the main catalog list with detailed fields
  readonly project = computed(() => {
    const currentId = this.id();
    const base = this.projectService.projectsResource.value()?.find((p) => p.id === currentId);
    if (!base) return null;
    return { ...base, ...this.details.value() };
  });

  // Aggregate loading state from both the main resource and the individual details resource
  readonly isLoading = computed(
    () => this.projectService.projectsResource.isLoading() || this.details.isLoading(),
  );
}
