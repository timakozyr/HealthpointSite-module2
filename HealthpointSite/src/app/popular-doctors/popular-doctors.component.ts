import { Component } from '@angular/core';
import { Doctor } from '../models/doctor';
import { DoctorsService } from '../services/doctors.service';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { Specialization } from '../models/specialization';
import { SpecializationService } from '../services/specialization.service';

@Component({
  selector: 'app-popular-doctors',
  templateUrl: './popular-doctors.component.html',
  styleUrls: ['./popular-doctors.component.scss']
})
export class PopularDoctorsComponent {
  doctorTypes: Specialization[];
  doctors: Doctor[];
  visibility = 'shown';

  constructor(public doctorService: DoctorsService, public specService: SpecializationService, public dialog: MatDialog) {
    this.doctors = [];
    this.doctorTypes = [];
  }

  getDoctorsBySpec(specId) {    
    return this.doctors.filter(d => d.specializationId == specId).slice(0, 3);
  }
  

  ngOnInit() {
    this.specService.getSpecializations().subscribe(res => this.doctorTypes = [...res]);
    this.doctorService.getDoctors().subscribe(res => this.doctors = [...res]);
  }

  openAppointmentForm() {
    this.dialog.open(AppointmentFormComponent);
  }
}
