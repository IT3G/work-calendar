import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PresencePageComponent } from './presence-page.component';

describe('MyPresenceComponent', () => {
  let component: PresencePageComponent;
  let fixture: ComponentFixture<PresencePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PresencePageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresencePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
