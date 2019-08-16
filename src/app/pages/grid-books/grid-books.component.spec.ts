import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridBooksComponent } from './grid-books.component';

describe('GridBooksComponent', () => {
  let component: GridBooksComponent;
  let fixture: ComponentFixture<GridBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
