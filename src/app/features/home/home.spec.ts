import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { Home } from './home';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../core/models/project.model';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'Modern Dashboard',
      subtitle: 'Analytics App',
      description: 'Real-time metrics tracking',
      techStack: ['Angular', 'Signals', 'Vitest'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      status: 'Live',
      badge: 'Featured',
      symbol: '📊',
    },
  ];

  // Mock implementation of ProjectService using modern signals
  const mockProjectService = {
    projectsResource: {
      value: signal<Project[]>(mockProjects),
      isLoading: signal<boolean>(false),
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([]), { provide: ProjectService, useValue: mockProjectService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verify that the component instance is successfully created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verify that projects are correctly exposed from the service resource
  it('should correctly expose projects from the resource', () => {
    const projects = component.projects();

    expect(projects).toBeTruthy();
    expect(projects.length).toBe(1);
    expect(projects[0].title).toBe('Modern Dashboard');
  });

  // Verify that the loading state is correctly exposed from the service resource
  it('should correctly expose the loading state from the resource', () => {
    expect(component.isLoading()).toBe(false);
  });
});
