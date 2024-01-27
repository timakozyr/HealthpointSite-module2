import { Component, Inject, LOCALE_ID } from '@angular/core';
import { User, UserProfile } from '../models/user';
import { UserService } from '../services/user.service';
import { Appointment } from '../models/appointment';
import { Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { DoctorsService } from '../services/doctors.service';
import { MedservicesService } from '../services/medservices.service';
import { Doctor } from '../models/doctor';
import { MedService } from '../models/med-service';
import { AuthService } from '../services/authservice.service';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { AdmEditAppComponent } from '../adm-edit-app/adm-edit-app.component';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimeSlot } from '../models/timeslot';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.scss'],
  animations: []
})
export class AppointmentsListComponent {
  breakpoint: number = 2;
  rh = '1:1.5';
  doctors: Doctor[];
  services: MedService[];
  user: User;
  appointments: Appointment[];
  errorMsg: string;
  columnsToDisplay: string[] = ['date', 'medService', 'visiting', 'actions'];
  expandedElement!: Appointment | null;
  UserProfileType = UserProfile;

  resize(targetWidth) {
    if (targetWidth > 435) {
      this.breakpoint = 2;
      this.rh = '1:1.5';
    } else if (targetWidth > 340) {
      this.breakpoint = 1;
      this.rh = '1:1';
    } else {
      this.breakpoint = 1;
      this.rh = '1:1.5';
    }
  }
  
  onResize(event) {
    this.resize(event.target.innerWidth);
  }

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private _auth: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private appointmentService: AppointmentService,
    private doctorService: DoctorsService,
    private userService: UserService,
    private medServiceService: MedservicesService,
    public snackBar: MatSnackBar
  ) {
    this.appointments = [];
    this.services = [];
    this.doctors = [];
  }
 
  ngOnInit(): void {
    this.user = UserService.CurrentUser;
    if (!UserService.checkUser()) this.router.navigateByUrl('/');
    this.resize(window.innerWidth);

    this.doctorService.getDoctors().subscribe((res) => this.doctors = [...res]);
    this.medServiceService.getAllServices().subscribe(res => this.services = [...res]);
    this.appointmentService.getAllAppointments().subscribe(res => this.appointments = [...res]);
  }

  logout() {
    this._auth.clearStorage();
    this.router.navigateByUrl('/home');
  }

  openAppForm() {
    let dialogRef = this.dialog.open(AppointmentFormComponent, {width: '600px', height: '500px'});
    
    dialogRef.afterClosed().subscribe(() => {
      if (dialogRef.componentInstance.appointment.id != 0)
        this.appointments = [...this.appointments, dialogRef.componentInstance.appointment];
    });
  }

  openEditAppForm(appointmentId: number) {
    let appointment = this.appointments.find(app => app.id == appointmentId)!;

    let dialogRef = this.dialog.open(AdmEditAppComponent, {width: '600px', height: '500px', data: {app: appointment}});

    dialogRef.afterClosed().subscribe(() => {
      if (dialogRef.componentInstance.change) {
        this.appointments = [...this.appointments.filter(app => app.id != appointmentId), dialogRef.componentInstance.appointment];
      }
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

  getDoctorById(id: number) {
    return this.doctors.find(d => d.doctorId == id) ?? new Doctor;
  }

  getServiceById(id: number) {
    return this.services.find(s => s.id == id);
  }

  getUserById(id: number) {
    let user = new User;
    this.userService.getUserById(id).subscribe(res => user = res);
    return user;
  }

  getDateString(date: Date, time: number) {
    return formatDate(date, 'yyyy-MM-dd ', this.locale) + TimeSlot.getTimeBySlot(time);
  }
}


