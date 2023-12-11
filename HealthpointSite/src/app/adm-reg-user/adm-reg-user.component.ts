import { Component, OnInit } from '@angular/core';
import { User, UserProfile } from '../models/user';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-adm-reg-user',
  templateUrl: './adm-reg-user.component.html',
  styleUrls: ['./adm-reg-user.component.scss']
})
export class AdmRegUserComponent implements OnInit {
  
  user = new User(UserProfile.user);
  usrpassword!: string;
  constructor(public dialogRef: MatDialogRef<AdmRegUserComponent>,
              private userService: UserService,
              private _router : Router,
              public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.register();
  }

  register() {
    try {
      this.userService.registerPatient(this.user).subscribe((res: any) => {
        this.snackBar.open('Успешная регистрация!', 'Скрыть', {
          duration: 3000
        })
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
