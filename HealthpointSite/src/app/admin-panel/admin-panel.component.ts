import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { AdmRegUserComponent } from '../adm-reg-user/adm-reg-user.component';
import { AdmRegDoctorComponent } from '../adm-reg-doctor/adm-reg-doctor.component';
import { AdmEditAppComponent } from '../adm-edit-app/adm-edit-app.component';
import { AdmNewServiceComponent } from '../adm-new-service/adm-new-service.component';
import { MedService } from '../models/med-service';
import { Doctor } from '../models/doctor';
import { Appointment } from '../models/appointment';
import { DoctorsService } from '../services/doctors.service';
import { MedservicesService } from '../services/medservices.service';
import { AppointmentService } from '../services/appointment.service';
import { SpecializationService } from '../services/specialization.service';
import { Specialization } from '../models/specialization';
import { AuthService } from '../services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  showType: number = 1;
  doctorsColumns: string[] = ['name', 'specialization', 'actions'];
  appointmentColumns: string[] = ['date', 'medService', 'doctorType', 'doctor', 'patient', 'actions'];
  servicesColumns: string[] = ['name', 'category', 'actions'];
  services: MedService[];
  doctors: Doctor[];
  appointments: Appointment[];
  specs: Specialization[];


  constructor(
    private appointmentService: AppointmentService,
    private medServicesService: MedservicesService,
    private doctorsService: DoctorsService,
    private specService: SpecializationService,
    private _auth: AuthService,
    private router: Router,
    public dialog: MatDialog) {
      this.doctors = [];
      this.services = [];
      this.appointments = [];
      this.specs = [];
  }

  ngOnInit(): void {
    this.loadDoctors();
    this.loadServices();
    this.loadAppointments();
    this.loadSpecs();
  }

  logout() {
    this._auth.clearStorage();
    this.router.navigateByUrl('/home');
  }

  loadDoctors() {
    this.doctorsService.getDoctors().subscribe((res) => this.doctors = [...res]);
  }

  loadServices() {
    this.medServicesService.getAllServices().subscribe(res => this.services = [...res]);
  }

  loadAppointments() {
    this.appointmentService.getAllAppointments().subscribe(res => this.appointments = [...res]);
  }

  loadSpecs() {
    this.specService.getSpecializations().subscribe(res => this.specs = [...res]);
  }

  getSpecById(id: number) {
    return this.specs.find(el => el.id === id)?.name ?? "";
  }

  openNewAppForm() {
    let dialogRef = this.dialog.open(AppointmentFormComponent);
    
    dialogRef.afterClosed().subscribe(() => {
      if (dialogRef.componentInstance.appointment.id != 0)
        this.appointments = [...this.appointments, dialogRef.componentInstance.appointment];
    });
  }

  openEditAppForm() {
    this.dialog.open(AdmEditAppComponent);
  }

  openNewServiceForm() {
    let dialogRef = this.dialog.open(AdmNewServiceComponent)
    dialogRef.afterClosed().subscribe(() => {
      if (dialogRef.componentInstance.service.id != 0)
        this.services = [...this.services, dialogRef.componentInstance.service];
    });
  }

  openRegForm(isDoctor) {
    if (isDoctor) {
      let dialogRef = this.dialog.open(AdmRegDoctorComponent, {width: '600px', height: '450px'});
      dialogRef.afterClosed().subscribe(() => {
        if (dialogRef.componentInstance.user.id != 0)
          this.doctors = [...this.doctors, Doctor.createDoctor(dialogRef.componentInstance.user, dialogRef.componentInstance.specializationId)];
      });
    } else {
      this.dialog.open(AdmRegUserComponent, {width: '600px', height: '450px'});
    }
  }

  deleteDoctor(id: number) {
    this.doctorsService.deleteDoctor(id).subscribe(_ => {
      this.doctors = [...this.doctors.filter(d => d.id != id)];
    });
  }

  deleteService(id: number) {
    this.medServicesService.deleteService(id).subscribe(_ => {
      this.services = [...this.services.filter(d => d.id != id)];
    });
  }

  deleteAppointment(id: number) {
    this.appointmentService.deleteAppointment(id).subscribe(_ => {
      this.appointments = [...this.appointments.filter(d => d.id != id)];
    });
  }
}
