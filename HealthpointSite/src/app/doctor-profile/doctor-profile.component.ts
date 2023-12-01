import { Component } from '@angular/core';
import { Doctor } from '../models/doctor';
import { ActivatedRoute } from '@angular/router';
import { DoctorsService } from '../services/doctors.service';
import { MedService } from '../models/med-service';
import { MedservicesService } from '../services/medservices.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent {

  doctor: Doctor;
  breakpoint: number = 3;
  services: MedService[];

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 3;
  }
  
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 3;
  }

  constructor(public route: ActivatedRoute, doctorsService: DoctorsService, medService: MedservicesService) {
    this.doctor = new Doctor();
    route.params.subscribe(params => {
      console.log(params);
      this.doctor = doctorsService.getDoctor(params.id)!;
    });
    this.services = medService.getAllServices();
  }
}
