import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDetailsComponent } from './article-details.component';

describe('ArticleDetailsComponent', () => {
  let component: ArticleDetailsComponent;
  let fixture: ComponentFixture<ArticleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
