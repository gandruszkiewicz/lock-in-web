import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInformationsComponent } from './my-informations.component';

describe('MyInformationsComponent', () => {
  let component: MyInformationsComponent;
  let fixture: ComponentFixture<MyInformationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyInformationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
