import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedBooksComponent } from './top-rated.component';

describe('TopRatedComponent', () => {
  let component: TopRatedBooksComponent;
  let fixture: ComponentFixture<TopRatedBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopRatedBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRatedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
