import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTitleChildComponent } from './job-title-child.component';

describe('JobTitleChildComponent', () => {
  let component: JobTitleChildComponent;
  let fixture: ComponentFixture<JobTitleChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobTitleChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTitleChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
