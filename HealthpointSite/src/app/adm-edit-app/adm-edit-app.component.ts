import { Component, Inject } from '@angular/core';
import { User, UserProfile } from '../models/user';
import { Specialization } from '../models/specialization';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Appointment } from '../models/appointment';
import { Doctor } from '../models/doctor';
import { MedService } from '../models/med-service';
import { AppointmentService } from '../services/appointment.service';
import { DoctorsService } from '../services/doctors.service';
import { MedservicesService } from '../services/medservices.service';
import { SpecializationService } from '../services/specialization.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-adm-edit-app',
  templateUrl: './adm-edit-app.component.html',
  styleUrls: ['./adm-edit-app.component.scss']
})
export class AdmEditAppComponent {
  UserProfileType = UserProfile;

  doctorTypes: Specialization[];
  serviceTypes: MedService[];
  appointment: Appointment;
  doctors: Doctor[];
  user: User;
  patients: User[];
  currentUser: User;
  change: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdmEditAppComponent>,
    public doctorsService: DoctorsService,
    public specService: SpecializationService,
    private appointmentService: AppointmentService,
    public medService: MedservicesService,
    private userService: UserService,
    public snackBar: MatSnackBar,
    private _router: Router,)
  {
    this.patients = [];
    this.doctorTypes = [];
    this.serviceTypes = [];
    this.doctors = [];
    this.appointment = new Appointment;
    this.user = new User;
    this.user = UserService.CurrentUser;
    this.change = false;
  }

  getDoctorsBySpec(serviceId) {
    let specId = this.serviceTypes.find(s => s.id == serviceId)?.specialization;
    return this.doctors.filter(d => d.specialization == specId);
  }

  getPatients() {
    return this.patients;
  }

  ngOnInit(): void {
    this.currentUser = UserService.CurrentUser;
    this.appointment = new Appointment;

    this.specService.getSpecializations().subscribe(res => this.doctorTypes = [...res]);
    this.medService.getAllServices().subscribe(res => this.serviceTypes = [...res]);
    this.doctorsService.getDoctors().subscribe(res => this.doctors = [...res]);

    if (this.data.app != undefined) {
      this.appointment.id = this.data.app.id;
      this.appointment.cabinet = this.data.app.cabinet;
      this.appointment.date = this.data.app.date;
      this.appointment.doctorId = this.data.app.doctorId;
      this.appointment.patientId = this.data.app.patientId;
      this.appointment.medServiceId = this.data.app.medServiceId;
      this.appointment.medService = this.data.app.medService;
      this.appointment.time = this.data.app.time;
      if (this.currentUser.profile == UserProfile.admin)
        this.userService.getUserById(this.appointment.patientId).subscribe(res => this.user = res);
    }

    if (UserService.checkUser() && UserService.CurrentUser.profile == UserProfile.admin) {
      this.userService.getAllUsers().subscribe(res => this.patients = [...res]);
    }

    this.change = false;
  }

  onSubmit(): void {
    try {
      this.appointmentService.updateAppointment(this.appointment).subscribe((res: any) => {
        this.snackBar.open('Успешно изменено!', 'Скрыть', {
          duration: 3000
        })
        this.change = true;
        this.dialogRef.close();
        this._router.navigateByUrl('/user');
      });
    } catch (err: any) {
      if (err.status === 401) {
        this.snackBar.open('Ошибка регистрации!', 'Undo', {
          duration: 3000
        });
      } else {
        this.snackBar.open('Ошибка на стороне сервера!'), 'Undo', {
          duration: 3000
        };
      }
    }
  }
}
