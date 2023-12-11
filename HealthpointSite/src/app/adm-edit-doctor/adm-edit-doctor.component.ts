import { Component, Inject } from '@angular/core';
import { User, UserProfile } from '../models/user';
import { Specialization } from '../models/specialization';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DoctorsService } from '../services/doctors.service';
import { SpecializationService } from '../services/specialization.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Doctor } from '../models/doctor';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-adm-edit-doctor',
  templateUrl: './adm-edit-doctor.component.html',
  styleUrls: ['./adm-edit-doctor.component.scss']
})
export class AdmEditDoctorComponent {
  change: boolean;
  doctor: Doctor;
  user: User;
  specs: Specialization[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdmEditDoctorComponent>,
    private _router: Router,
    private doctorsService: DoctorsService,
    private specService: SpecializationService,
    private userService: UserService,
    public snackBar: MatSnackBar) {
      this.specs = [];
      this.change = false;
      this.doctor = new Doctor;
      this.user = new User(UserProfile.doctor);
  }

  ngOnInit(): void {
    this.user = new User(UserProfile.doctor);
    if (this.data.doctorId != undefined && this.data.userId != undefined) {
      this.doctorsService.getDoctor(this.data.doctorId).subscribe(res => this.doctor = res);
    }
    this.specService.getSpecializations().subscribe(res => this.specs = [...res]);
    this.change = false;
  }

  onSubmit(): void {
    try {
      this.doctorsService.updateDoctor(this.doctor).subscribe((res: any) => {
        this.snackBar.open('Успешно изменено!', 'Скрыть', {
          duration: 3000
        });
        this.user.id = res.user.id;
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
