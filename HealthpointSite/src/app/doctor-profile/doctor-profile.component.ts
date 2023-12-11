import { Component } from '@angular/core';
import { Doctor } from '../models/doctor';
import { ActivatedRoute } from '@angular/router';
import { DoctorsService } from '../services/doctors.service';
import { MedService } from '../models/med-service';
import { MedservicesService } from '../services/medservices.service';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { LoginComponent } from '../login/login.component';
import { SpecializationService } from '../services/specialization.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent {

  doctor: Doctor;
  breakpoint: number = 3;
  services: MedService[];
  spec: string;

  constructor(public route: ActivatedRoute,
              private doctorsService: DoctorsService,
              private specService: SpecializationService,
              private medService: MedservicesService, public dialog: MatDialog) {
    this.doctor = new Doctor;
    this.services = [];
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 3;
    this.route.params.subscribe(params => {
      this.doctorsService.getDoctor(params.id).subscribe(res => {
        this.doctor = res;
        this.medService.getAllServices().subscribe(res =>
          this.services = [...res.filter(r => r.specialization == this.doctor.specialization)]);
      });
      this.specService.getSpecializationById(params.id).subscribe(res => this.spec = res.name);
    });
  }
  
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 3;
  }

  checkUser() {
    return UserService.checkUser();
  }

  openAppointmentForm() {
    if (this.checkUser()) {
      this.dialog.open(AppointmentFormComponent, {data: {doctorId: this.doctor.doctorId}});
    } 
    else
      this.dialog.open(LoginComponent, {width: '600px'});
  }
}
