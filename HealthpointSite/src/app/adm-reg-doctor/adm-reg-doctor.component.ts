import { Component, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, UserProfile } from '../models/user';
import { DoctorsService } from '../services/doctors.service';
import { Router } from '@angular/router';
import { SpecializationService } from '../services/specialization.service';
import { Specialization } from '../models/specialization';

@Component({
  selector: 'app-adm-reg-doctor',
  templateUrl: './adm-reg-doctor.component.html',
  styleUrls: ['./adm-reg-doctor.component.scss']
})
export class AdmRegDoctorComponent {
  user = new User(UserProfile.doctor);
  specializationId: number;
  specs: Specialization[];

  constructor(public dialogRef: MatDialogRef<AdmRegDoctorComponent>,
              private _router: Router,
              private doctorsService: DoctorsService,
              private specService: SpecializationService,
              public snackBar: MatSnackBar) {
                this.specs = [];
              }

  ngOnInit(): void {
    this.specService.getSpecializations().subscribe(res => this.specs = [...res]);
  }

  onSubmit(): void {
    this.register();
  }

  register() {
    try {
      this.doctorsService.register(this.user, this.specializationId).subscribe((res: any) => {
        this.snackBar.open('Успешная регистрация!', 'Скрыть', {
          duration: 3000
        })
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
