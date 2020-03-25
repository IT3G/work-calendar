import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserForLocationTableComponent } from './user-for-location-table.component';

describe('UserForLocationTableComponent', () => {
  let component: UserForLocationTableComponent;
  let fixture: ComponentFixture<UserForLocationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserForLocationTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserForLocationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
