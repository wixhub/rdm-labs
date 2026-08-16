import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  // Configure testing module before each test case
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  // Verify that the application component is successfully created
  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  // Verify that the component renders the correct initial state or title
  it('should render the component correctly', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
  });
});
