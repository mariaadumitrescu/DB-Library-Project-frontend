import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookChartComponent } from './book-chart.component';

describe('BookChartComponent', () => {
  let component: BookChartComponent;
  let fixture: ComponentFixture<BookChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
