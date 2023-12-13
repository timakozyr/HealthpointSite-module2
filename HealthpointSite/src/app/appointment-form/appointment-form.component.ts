import { Component, Inject, LOCALE_ID } from '@angular/core';
import { Appointment } from '../models/appointment';
import { DoctorsService } from '../services/doctors.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  minDate: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
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
    this.user = new User;
  }

  checkUser = () => UserService.checkUser();

  getDoctorsBySpec(serviceId) {
    let specId = this.serviceTypes.find(s => s.id == serviceId)?.specialization;
    return this.doctors.filter(d => d.specialization == specId);
  }

  getPatients() {
    return this.patients;
  }

  ngOnInit(): void {
    this.appointment = new Appointment;
    this.minDate = new Date();

    this.specService.getSpecializations().subscribe(res =>
      this.doctorTypes = [...res]
    );

    this.doctorsService.getDoctors().subscribe(res => {
      this.doctors = [...res];
      if (this.data != null && this.data.doctorId != undefined) {
        this.appointment.doctorId = this.data.doctorId;
      };

      this.medService.getAllServices().subscribe(res => {
        this.serviceTypes = [...res.filter(s => this.doctors.find(d => d.specialization == s.specialization))];
        if (this.data != null && this.data.serviceId != undefined) {
          this.appointment.medServiceId = this.data.serviceId;
        }
      });
    });

    this.user = UserService.CurrentUser;

    if (UserService.checkUser() && UserService.CurrentUser.profile != UserProfile.admin) {
      this.appointment.patientId = UserService.CurrentUser.id;
    }

    if (UserService.checkUser() && UserService.CurrentUser.profile == UserProfile.admin)
      this.userService.getAllUsers().subscribe(res => this.patients = [...res]);
  }

  onSubmit(): void {
    try {
      this.appointmentService.addAppointment(this.appointment).subscribe((res: any) => {
        this.snackBar.open('Успешно добавлено!', 'Скрыть', {
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
