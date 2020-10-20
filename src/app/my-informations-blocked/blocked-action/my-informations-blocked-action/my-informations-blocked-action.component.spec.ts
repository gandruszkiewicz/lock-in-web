import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInformationsBlockedActionComponent } from './my-informations-blocked-action.component';

describe('MyInformationsBlockedActionComponent', () => {
  let component: MyInformationsBlockedActionComponent;
  let fixture: ComponentFixture<MyInformationsBlockedActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyInformationsBlockedActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInformationsBlockedActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
