import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that no unexpected HTTP requests remain pending
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch projects list on initialization', () => {
    // Expect the initial automatic request for the projects list
    const req = httpMock.expectOne('data/projects.json');
    expect(req.request.method).toBe('GET');

    const mockProjects = [{ id: '1', title: 'Alpha Project' }];
    req.flush(mockProjects);

    expect(service.projectsResource.value()).toEqual(mockProjects);
  });

  it('should fetch project details dynamically when selectProject is called', () => {
    // Flush initial projects list request first to clear the queue
    const listReq = httpMock.expectOne('data/projects.json');
    listReq.flush([]);

    // Trigger dynamic project selection
    service.selectProject('42');

    // Expect a subsequent HTTP request triggered by the reactive resource change
    const detailReq = httpMock.expectOne('data/projects/42.json');
    expect(detailReq.request.method).toBe('GET');

    const mockDetails = { id: '42', title: 'Detailed Project 42' };
    detailReq.flush(mockDetails);

    expect(service.projectDetailsResource.value()).toEqual(mockDetails);
  });
});
