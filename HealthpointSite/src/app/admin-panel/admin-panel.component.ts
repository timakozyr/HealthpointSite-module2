import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { AdmEditServiceComponent } from '../adm-edit-service/adm-edit-service.component';
import { AdmEditDoctorComponent } from '../adm-edit-doctor/adm-edit-doctor.component';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdmNewSpecComponent } from '../adm-new-spec/adm-new-spec.component';
import { AdmEditSpecComponent } from '../adm-edit-spec/adm-edit-spec.component';
import { TimeSlot } from '../models/timeslot';

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
  specsColumns: string[] = ['name', 'description', 'actions'];
  services: MedService[];
  doctors: Doctor[];
  appointments: Appointment[];
  specs: Specialization[];
  users: User[];


  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private appointmentService: AppointmentService,
    private medServicesService: MedservicesService,
    private doctorsService: DoctorsService,
    private specService: SpecializationService,
    private userService: UserService,
    private _auth: AuthService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) {
      this.doctors = [];
      this.services = [];
      this.appointments = [];
      this.specs = [];
      this.users = [];
  }

  ngOnInit(): void {
    this.loadDoctors();
    this.loadServices();
    this.loadAppointments();
    this.loadSpecs();
    this.loadUsers();
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

  loadUsers() {
    this.userService.getAllUsers().subscribe(res => this.users = [...res]);
  }

  getSpecById(id: number) {
    return this.specs.find(el => el.id === id)?.name ?? "";
  }

  getDoctorById(id: number) {
    return this.doctors.find(el => el.doctorId === id);
  }

  getUserById(id: number) {
    return this.users.find(el => el.id === id);
  }

  getServiceById(id: number) {
    return this.services.find(el => el.id === id);
  }

  openNewSpecForm() {
    let dialogRef = this.dialog.open(AdmNewSpecComponent, {width: '600px', height: '600px'});

    dialogRef.afterClosed().subscribe(() => {
      if (dialogRef.componentInstance.spec.id != 0) {
        this.specs = [...this.specs, dialogRef.componentInstance.spec];
      }
    })
  }

  openEditSpecForm(specId: number) {
    let spec = this.specs.find(s => s.id == specId);

    let dialogRef = this.dialog.open(AdmEditSpecComponent, {width: '600px', height: '600px', data: {spec: spec}});

    dialogRef.afterClosed().subscribe(() => {
      if (dialogRef.componentInstance.change) {
        this.specs = [...this.specs.filter(spec => spec.id != specId), dialogRef.componentInstance.spec];
      }
    });
  }

  openNewAppForm() {
    let dialogRef = this.dialog.open(AppointmentFormComponent, {width: '600px', height: '600px'});
    
    dialogRef.afterClosed().subscribe(() => {
      if (dialogRef.componentInstance.appointment.id != 0)
        this.appointments = [...this.appointments, dialogRef.componentInstance.appointment];
    });
  }

  openEditAppForm(appointmentId: number) {
    let appointment = this.appointments.find(app => app.id == appointmentId)!;

    let dialogRef = this.dialog.open(AdmEditAppComponent, {width: '600px', height: '600px', data: {app: appointment}});

    dialogRef.afterClosed().subscribe(() => {
      if (dialogRef.componentInstance.change) {
        this.appointments = [...this.appointments.filter(app => app.id != appointmentId), dialogRef.componentInstance.appointment];
      }
    });
  }

  openNewServiceForm() {
    let dialogRef = this.dialog.open(AdmNewServiceComponent, {width: '600px', height: '450px'});
    dialogRef.afterClosed().subscribe(() => {
      if (dialogRef.componentInstance.service.id != 0)
        this.services = [...this.services, dialogRef.componentInstance.service];
    });
  }

  openEditServiceForm(serviceId: number) {
    let service = this.services.find(service => service.id == serviceId);
    let dialogRef = this.dialog.open(AdmEditServiceComponent, {width: '600px', height: '450px', data: {service: service}});
    dialogRef.afterClosed().subscribe(() => {
      if (dialogRef.componentInstance.change) {
        this.services = [...this.services.filter(service => service.id != serviceId), dialogRef.componentInstance.service];
      }
    });
  }

  openEditDoctorForm(doctorId: number, userId: number) {
    let dialogRef = this.dialog.open(AdmEditDoctorComponent, {width: '600px', height: '450px', data: {doctorId: doctorId, userId: userId}});
    dialogRef.afterClosed().subscribe(() => {
      if (dialogRef.componentInstance.change) {
        this.doctors = [...this.doctors.filter(doctor => doctor.doctorId != doctorId), dialogRef.componentInstance.doctor];
      }
    });
  }

  openRegForm(isDoctor) {
    if (isDoctor) {
      let dialogRef = this.dialog.open(AdmRegDoctorComponent, {width: '600px', height: '470px'});
      dialogRef.afterClosed().subscribe(() => {
        if (dialogRef.componentInstance.doctor.id != 0)
          this.doctors = [...this.doctors, dialogRef.componentInstance.doctor];
      });
    } else {
      this.dialog.open(AdmRegUserComponent, {width: '600px', height: '460px'});
    }
  }

  deleteDoctor(id: number) {
    this.doctorsService.deleteDoctor(id).subscribe(_ => {
      this.doctors = [...this.doctors.filter(d => d.doctorId != id)];
      this.snackBar.open('Успешно удалено!', 'Скрыть', {
        duration: 3000
      });
    });
  }

  deleteService(id: number) {
    this.medServicesService.deleteService(id).subscribe(_ => {
      this.services = [...this.services.filter(d => d.id != id)];
      this.snackBar.open('Успешно удалено!', 'Скрыть', {
        duration: 3000
      });
    });
  }

  deleteAppointment(id: number) {
    this.appointmentService.deleteAppointment(id).subscribe(_ => {
      this.appointments = [...this.appointments.filter(d => d.id != id)];
      this.snackBar.open('Успешно отменено!', 'Скрыть', {
        duration: 3000
      });
    });
  }

  deleteSpec(id: number) {
    this.specService.deleteSpecialization(id).subscribe(_ => {
      this.specs = [...this.specs.filter(s => s.id != id)];
      this.snackBar.open('Успешно удалено!', 'Скрыть', {
        duration: 3000
      });
    })
  }

  getDateString(date: Date, time: string) {
    return formatDate(date, 'yyyy-MM-dd ', this.locale) + TimeSlot.getTimeBySlot(time);
  }
}
