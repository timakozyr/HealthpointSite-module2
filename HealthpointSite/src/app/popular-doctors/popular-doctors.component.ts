import { Component } from '@angular/core';
import { Doctor } from '../models/doctor';
import { DoctorsService } from '../services/doctors.service';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';

@Component({
  selector: 'app-popular-doctors',
  templateUrl: './popular-doctors.component.html',
  styleUrls: ['./popular-doctors.component.scss']
})
export class PopularDoctorsComponent {
  doctorTypes: string[];
  visibility = 'shown';

  constructor(public doctorService: DoctorsService, public dialog: MatDialog) {
    this.doctorTypes = doctorService.getDoctorsSpecs();
  }
  

  ngOnInit() {
  }

  openAppointmentForm() {
    this.dialog.open(AppointmentFormComponent);
  }
}
