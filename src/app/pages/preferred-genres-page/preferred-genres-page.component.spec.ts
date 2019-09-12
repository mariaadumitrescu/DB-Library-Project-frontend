import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferredGenresPageComponent } from './preferred-genres-page.component';

describe('PreferredGenresPageComponent', () => {
  let component: PreferredGenresPageComponent;
  let fixture: ComponentFixture<PreferredGenresPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferredGenresPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferredGenresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
