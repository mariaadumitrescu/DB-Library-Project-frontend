import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardBooksTableComponent } from './admin-dashboard-books-table.component';

describe('AdminDashboardBooksTableComponent', () => {
  let component: AdminDashboardBooksTableComponent;
  let fixture: ComponentFixture<AdminDashboardBooksTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashboardBooksTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardBooksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
