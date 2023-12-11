import { Component } from '@angular/core';
import { MedService } from '../models/med-service';
import { MedservicesService } from '../services/medservices.service';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { Specialization } from '../models/specialization';
import { SpecializationService } from '../services/specialization.service';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../services/user.service';
import { DoctorsService } from '../services/doctors.service';

@Component({
  selector: 'app-med-services',
  templateUrl: './med-services.component.html',
  styleUrls: ['./med-services.component.scss']
})
export class MedServicesComponent {

  selectedSpec: number;
  allServices: MedService[];
  selectedServices: MedService[];
  specs: Specialization[];
  searchTerm: string;
  breakpoint: number = 3;
  rh = '3:1';

  lgScreen = 1500;
  mdScreen = 700;

  resize(targetWidth) {
    if (targetWidth > this.lgScreen) {
      this.breakpoint = 3;
      this.rh = '2 : 0.7';
    } else if (targetWidth <= this.lgScreen && targetWidth > this.mdScreen) {
      this.breakpoint = 2;
      this.rh = '1.25 : 0.7';
    } else if (targetWidth < this.mdScreen && targetWidth > 400) {
      this.breakpoint = 1;
      this.rh = '1 : 0.5'
    } else {
      this.breakpoint = 1;
      this.rh = '1 : 0.7';
    }
  }

  ngOnInit() {
    this.resize(window.innerWidth);
    this.searchTerm = '';
    this.doctorsService.getDoctors().subscribe(res => {
      let doctors = [...res];
      this.medService.getAllServices().subscribe(res => {
        this.allServices = [...res.filter(s => doctors.find(d => d.specialization == s.specialization))];
        this.filterServices();
      });
      this.specService.getSpecializations().subscribe(res => this.specs = [...res.filter(s => this.allServices.find(sr => sr.specialization == s.id))]);
    });
  }

  setSelectedSpec(spec) {
    this.selectedSpec = spec.id;
  }
  
  onResize(event) {
    this.resize(event.target.innerWidth);
  }

  constructor(private specService: SpecializationService, private medService: MedservicesService, private doctorsService: DoctorsService, public dialog: MatDialog) {
    this.allServices = [];
    this.specs = [];
    this.selectedServices = [];
    this.searchTerm = '';
  }

  checkUser() {
    return UserService.checkUser();
  }

  openAppointmentForm(serviceId: number) {
    if (this.checkUser()) {
      this.dialog.open(AppointmentFormComponent, {data: {serviceId: serviceId}});
    } 
    else
      this.dialog.open(LoginComponent, {width: '600px'});
  }

  filterBySpecialization(specializationId: number) {
    if (specializationId == null) return this.allServices;
    return this.allServices.filter(el => el.specialization == specializationId);
  }

  filterServices() {
    if (this.searchTerm == '') {
      this.selectedServices = [...this.allServices].sort((s1, s2) => s1.id - s2.id);
    } else {
      this.selectedServices = [...this.allServices.filter(el => el.name.trim().toLowerCase().startsWith(this.searchTerm.trim().toLowerCase()))].sort((s1, s2) => s1.id - s2.id);
    }
  }

  serviceIsSelected(id: number) {
    return this.selectedServices.findIndex(s => s.id == id) > -1 ? true : null;
  }

  changeSelected(event, id: number) {
    if (event.checked) {
      this.selectedServices = [...this.selectedServices, (this.allServices.find(s => s.id == id)!)].sort((s1, s2) => s1.id - s2.id);
    } else {
      this.selectedServices = [...this.selectedServices.filter(s => s.id != id)].sort((s1, s2) => s1.id - s2.id);
    }
  }
}