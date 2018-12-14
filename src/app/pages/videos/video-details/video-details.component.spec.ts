import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDetailsComponent } from './video-details.component';

describe('VideoDetailsComponent', () => {
  let component: VideoDetailsComponent;
  let fixture: ComponentFixture<VideoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
