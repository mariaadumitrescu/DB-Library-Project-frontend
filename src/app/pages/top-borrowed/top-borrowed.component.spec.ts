import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBorrowedComponent } from './top-borrowed.component';

describe('TopBorrowedComponent', () => {
  let component: TopBorrowedComponent;
  let fixture: ComponentFixture<TopBorrowedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBorrowedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBorrowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
