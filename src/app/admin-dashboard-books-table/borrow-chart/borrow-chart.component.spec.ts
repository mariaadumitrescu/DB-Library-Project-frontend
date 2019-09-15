import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowChartComponent } from './borrow-chart.component';

describe('BorrowChartComponent', () => {
  let component: BorrowChartComponent;
  let fixture: ComponentFixture<BorrowChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
