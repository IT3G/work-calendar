import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PresenceComponent } from './presence.component';

describe('MyPresenceComponent', () => {
  let component: PresenceComponent;
  let fixture: ComponentFixture<PresenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PresenceComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
