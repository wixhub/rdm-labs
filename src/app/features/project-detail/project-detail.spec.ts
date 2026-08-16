import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { signal } from '@angular/core';
import { ProjectDetail } from './project-detail';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../core/models/project.model';

describe('ProjectDetail', () => {
  let component: ProjectDetail;
  let fixture: ComponentFixture<ProjectDetail>;

  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'Angular 22 App',
      subtitle: 'Modern Framework',
      description: 'Cutting-edge features',
      techStack: ['Angular', 'Signals'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      status: 'Live',
      badge: 'Latest',
      symbol: '⚡',
    },
  ];

  // Mock implementation of ProjectService leveraging Angular signals
  const mockProjectService = {
    projectsResource: {
      value: signal<Project[]>(mockProjects),
      isLoading: signal<boolean>(false),
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetail],
      providers: [
        provideRouter([]),
        { provide: ProjectService, useValue: mockProjectService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: signal(new Map([['id', '1']])),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verify that the component instance is successfully created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verify that the component correctly resolves and displays the project based on route parameters
  it('should compute the correct project based on route id parameter', () => {
    const currentProject = component.project();

    expect(currentProject).toBeTruthy();
    expect(currentProject?.id).toBe('1');
    expect(currentProject?.title).toBe('Angular 22 App');
  });

  // Verify that the loading state reflects correctly from the resource
  it('should reflect loading state from project resource', () => {
    expect(component.isLoading()).toBe(false);
  });

  // Verify that it handles non-existent project IDs gracefully
  it('should return null when project id does not exist', async () => {
    // Reconfigure TestBed with a non-existent route ID parameter
    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [ProjectDetail],
      providers: [
        provideRouter([]),
        { provide: ProjectService, useValue: mockProjectService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: signal(new Map([['id', 'non-existent']])),
          },
        },
      ],
    }).compileComponents();

    const newFixture = TestBed.createComponent(ProjectDetail);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(newComponent.project()).toBeNull();
  });
});
