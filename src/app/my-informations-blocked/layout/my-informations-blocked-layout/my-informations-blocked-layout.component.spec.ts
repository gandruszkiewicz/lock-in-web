import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInformationsBlockedLayoutComponent } from './my-informations-blocked-layout.component';

describe('MyInformationsBlockedLayoutComponent', () => {
  let component: MyInformationsBlockedLayoutComponent;
  let fixture: ComponentFixture<MyInformationsBlockedLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyInformationsBlockedLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInformationsBlockedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
