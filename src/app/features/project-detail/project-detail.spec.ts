import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { ProjectDetail } from './project-detail';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../core/models/project.model';

describe('ProjectDetail', () => {
  let component: ProjectDetail;
  let fixture: ComponentFixture<ProjectDetail>;
  let projectServiceMock: Partial<ProjectService>;

  const mockProject: Project = {
    id: 'movebank-explorer-web',
    title: 'MoveRDM Dataset Explorer',
    subtitle: 'MoveRDM Initiative / MPIAB & University of Konstanz',
    description:
      'High-performance research data repository frontend built for the MoveRDM initiative.',
    techStack: ['Angular 22', 'TypeScript', 'Signals'],
    liveUrl: 'https://movebank-explorer.pages.dev',
    githubUrl: 'https://github.com/wixhub/movebank-explorer-web',
    status: 'Live',
    badge: 'Core Telemetry & Open Science',
    symbol: '🦩',
    researchDomain: 'Ecological & Behavioral Animal Tracking',
  };

  beforeEach(async () => {
    projectServiceMock = {
      projectsResource: {
        value: () => [mockProject],
        isLoading: () => false,
      } as any,
      getProjectDetails: vi.fn().mockReturnValue({
        value: () => ({ longDescription: 'Detailed architecture data' }),
        isLoading: () => false,
      }),
    };

    await TestBed.configureTestingModule({
      imports: [ProjectDetail],
      providers: [
        provideRouter([]),
        { provide: ProjectService, useValue: projectServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['id', 'movebank-explorer-web']])),
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
        { provide: ProjectService, useValue: projectServiceMock },
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
