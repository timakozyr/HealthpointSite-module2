import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { DoctorsService } from '../services/doctors.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MedservicesService } from '../services/medservices.service';
import { UserService } from '../services/user.service';
import { SpecializationService } from '../services/specialization.service';
import { Specialization } from '../models/specialization';
import { MedService } from '../models/med-service';
import { Doctor } from '../models/doctor';
import { AppointmentService } from '../services/appointment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User, UserProfile } from '../models/user';


@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent {
  UserProfileType = UserProfile;

  doctorTypes: Specialization[];
  serviceTypes: MedService[];
  appointment: Appointment;
  doctors: Doctor[];
  user: User;
  patients: User[];

  constructor(
    public dialogRef: MatDialogRef<AppointmentFormComponent>,
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
  }

  getDoctorsBySpec(specId) {
    return this.doctors.filter(d => d.specializationId == specId);
  }

  getPatients() {
    return this.patients;
  }

  ngOnInit(): void {
    if (UserService.checkUser() && UserService.CurrentUser.profile != UserProfile.admin) {
      this.appointment.patientFIO = UserService.CurrentUser.FIO();
      this.appointment.patientId = UserService.CurrentUser.id;
    }
    this.user = UserService.CurrentUser;

    this.specService.getSpecializations().subscribe(res => this.doctorTypes = [...res]);
    this.medService.getAllServices().subscribe(res => this.serviceTypes = [...res])
    this.doctorsService.getDoctors().subscribe(res => this.doctors = [...res]);
    this.userService.getAllUsers().subscribe(res => this.patients = [...res]);//.filter(u => u.profile == UserProfile.user));
  }

  onSubmit(): void {
    try {
      this.appointmentService.addAppointment(this.appointment).subscribe((res: any) => {
        this.snackBar.open('Успешная регистрация!', 'Скрыть', {
          duration: 3000
        })
        this.appointment.id = res.id;
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
