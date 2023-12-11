import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { RegisterComponent } from '../register/register.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/authservice.service';
import { catchError, map, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
              public dialogRef: MatDialogRef<LoginComponent>,
              public dialog: MatDialog,
              private router: Router,
              private _auth: AuthService,
              private userService: UserService,
              public snackBar: MatSnackBar) { }
  email: string = '';
  password: string = '';

  ngOnInit(): void {
    this._auth.clearStorage();
  }

  onSubmit(): void {
    this.login();
  }

  openRegForm() {
    this.dialog.open(RegisterComponent, {width: '600px', height: '450px'});
    this.dialogRef.close();
  }

  login() {
      this.userService.login(this.email, this.password).pipe(
        map(x => {
          if (x instanceof HttpErrorResponse) {
            throw x;
          }
          return x;
          })
        )
        .pipe(
          catchError(err => {
            if (err.status === 401 || err.status === 404) {
              this.snackBar.open('Ошибка входа!', 'Undo', {
                duration: 3000
              });
            } else {
              this.snackBar.open('Ошибка на стороне сервера!'), 'Undo', {
                duration: 3000
              };
            }
            return throwError(err);
          })
        ).subscribe((res: any) => {
        if(res.token){ 
          let createdUser = this.userService.createNewUserJson(res.user);
          this._auth.setDataInLocalStorage('token', res.token);
          this._auth.setDataInLocalStorage('user', JSON.stringify(createdUser));
          UserService.CurrentUser = createdUser;
        }
        this.dialogRef.close();
        this.router.navigate(['/']);
      })
  } 

}
