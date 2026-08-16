import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProjectService } from './project.service';
import { Project } from '../models/project.model';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;

  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'Test Project',
      subtitle: 'Test Subtitle',
      description: 'Test Description',
      techStack: ['Angular', 'Vitest'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      status: 'Live',
      badge: 'New',
      symbol: '🚀',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that there are no outstanding HTTP requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load projects via httpResource successfully', async () => {
    // Initially, the resource should have default value before request completes
    expect(service.projectsResource.value()).toEqual([]);

    // Expect a GET request to the projects endpoint
    const req = httpMock.expectOne('data/projects.json');
    expect(req.request.method).toBe('GET');

    // Flush the mock response
    req.flush(mockProjects);

    // Verify that the resource successfully updates its value
    expect(service.projectsResource.value()).toEqual(mockProjects);
    expect(service.projectsResource.isLoading()).toBe(false);
  });

  it('should handle errors gracefully and fallback to default value', () => {
    // Expect the HTTP request
    const req = httpMock.expectOne('data/projects.json');

    // Simulate a server error (500 Internal Server Error)
    req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });

    // Verify that the resource falls back to the default empty array safely
    expect(service.projectsResource.value()).toEqual([]);
  });
});
