import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmRegUserComponent } from './adm-reg-user.component';

describe('AdmRegUserComponent', () => {
  let component: AdmRegUserComponent;
  let fixture: ComponentFixture<AdmRegUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmRegUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmRegUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
