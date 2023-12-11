import { Component } from '@angular/core';
import { Doctor } from '../models/doctor';
import { DoctorsService } from '../services/doctors.service';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { Specialization } from '../models/specialization';
import { SpecializationService } from '../services/specialization.service';
import { UserService } from '../services/user.service';
import { LoginComponent } from '../login/login.component';
import { MedService } from '../models/med-service';
import { MedservicesService } from '../services/medservices.service';

@Component({
  selector: 'app-popular-doctors',
  templateUrl: './popular-doctors.component.html',
  styleUrls: ['./popular-doctors.component.scss']
})
export class PopularDoctorsComponent {
  doctorTypes: Specialization[];
  doctors: Doctor[];
  visibility = 'shown';

  constructor(public doctorService: DoctorsService,
              private servService: MedservicesService,
              public specService: SpecializationService,
              public dialog: MatDialog) {
    this.doctors = [];
    this.doctorTypes = [];
  }

  getDoctorsBySpec(specId) {    
    return this.doctors.filter(d => d.specialization == specId).slice(0, 3);
  }
  

  ngOnInit() {
    this.doctorService.getDoctors().subscribe(res => {
      this.doctors = [...res];
      this.specService.getSpecializations().subscribe(res =>
        this.doctorTypes = [...res.filter(r => this.doctors.find(s => s.specialization == r.id))]);
    });
  }

  checkUser() {
    return UserService.checkUser();
  }

  openAppointmentForm(doctorId: number) {
    if (this.checkUser())
      this.dialog.open(AppointmentFormComponent, {data: {doctorId: doctorId}});
    else
      this.dialog.open(LoginComponent, {width: '600px'});
  }
}
