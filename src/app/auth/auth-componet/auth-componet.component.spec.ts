import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponetComponent } from './auth-componet.component';

describe('AuthComponetComponent', () => {
  let component: AuthComponetComponent;
  let fixture: ComponentFixture<AuthComponetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthComponetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
