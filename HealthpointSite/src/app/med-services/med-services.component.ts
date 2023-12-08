import { Component } from '@angular/core';
import { MedService } from '../models/med-service';
import { MedservicesService } from '../services/medservices.service';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { Specialization } from '../models/specialization';
import { SpecializationService } from '../services/specialization.service';

@Component({
  selector: 'app-med-services',
  templateUrl: './med-services.component.html',
  styleUrls: ['./med-services.component.scss']
})
export class MedServicesComponent {

  allServices: MedService[];
  specs: Specialization[];
  searchTerm = '';
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
    this.medService.getAllServices().subscribe(res => {console.log(res); this.allServices = [...res]});
    this.specService.getSpecializations().subscribe(res => this.specs = [...res])
    this.resize(window.innerWidth);
  }
  
  onResize(event) {
    this.resize(event.target.innerWidth);
  }

  constructor(private medService: MedservicesService, private specService: SpecializationService, public dialog: MatDialog) {
    this.allServices = [];
    this.specs = [];
  }

  openAppointmentForm() {
    this.dialog.open(AppointmentFormComponent);
  }

  filterBySpecialization(specializationName: string) {
    let filteredSpecs = this.specs.filter(el => el.name.trim().toLowerCase() == specializationName.trim().toLowerCase());
    return this.allServices.filter(el => filteredSpecs.find(s => s.id === el.id));
  }
}