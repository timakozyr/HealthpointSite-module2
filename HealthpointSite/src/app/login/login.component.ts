import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { RegisterComponent } from '../register/register.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<LoginComponent>,
              public dialog: MatDialog,
              private router: Router,
              private userService: UserService,
              public snackBar: MatSnackBar) { }
  email: string = '';
  password: string = '';

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.login();
  }

  openRegForm() {
    this.dialog.open(RegisterComponent, {width: '600px', height: '450px'});
    this.dialogRef.close();
  }

  login() {
    try {
      this.userService.login(this.email, this.password);
      this.dialogRef.close();
      this.router.navigate(['/']);
    } catch (err: any) {
      if (err.status === 401 || err.status === 404) {
        this.snackBar.open('Ошибка авторизации!', 'Скрыть', {
          duration: 3000
        });
      } else {
        this.snackBar.open('Ошибка на стороне сервера!', 'Скрыть', {
          duration: 3000
        });
      }
    }
  } 

}
