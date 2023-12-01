import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { DoctorsService } from '../services/doctors.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MedservicesService } from '../services/medservices.service';


@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent {
  doctorTypes: string[];
  serviceTypes: string[];
  appointment: Appointment;

  constructor(
    public dialogRef: MatDialogRef<AppointmentFormComponent>,
    public doctorsService: DoctorsService,
    public medService: MedservicesService)
  {
    this.doctorTypes = doctorsService.getDoctorsSpecs();
    this.serviceTypes = medService.allServices.map(s => s.name);
    this.appointment = new Appointment;
  }

  ngOnInit(): void {
    this.appointment = new Appointment;
  }

  onSubmit(): void {
    this.dialogRef.close();
  }
}
