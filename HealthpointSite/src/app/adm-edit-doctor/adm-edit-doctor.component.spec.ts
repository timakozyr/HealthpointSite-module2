import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmEditDoctorComponent } from './adm-edit-doctor.component';

describe('AdmEditDoctorComponent', () => {
  let component: AdmEditDoctorComponent;
  let fixture: ComponentFixture<AdmEditDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmEditDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmEditDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
