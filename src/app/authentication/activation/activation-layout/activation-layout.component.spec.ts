import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationLayoutComponent } from './activation-layout.component';

describe('ActivationLayoutComponent', () => {
  let component: ActivationLayoutComponent;
  let fixture: ComponentFixture<ActivationLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivationLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
