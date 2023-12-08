import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmRegDoctorComponent } from './adm-reg-doctor.component';

describe('AdmRegDoctorComponent', () => {
  let component: AdmRegDoctorComponent;
  let fixture: ComponentFixture<AdmRegDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmRegDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmRegDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
