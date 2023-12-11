import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/authservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  user = new User();
  usrpassword!: string;
  constructor(public dialogRef: MatDialogRef<RegisterComponent>,
              private router : Router,
              private userService: UserService,
              private _auth: AuthService,
              public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.register();
  }

  register() {
      this.userService.register(this.user).pipe(
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
            this._auth.clearStorage();
            return throwError(err);
          })
        )
        .subscribe((res: any) => {
          if (res) {
            let createdUser = this.userService.createNewUserJson(res.user);
            this._auth.setDataInLocalStorage('token', res.token);
            this._auth.setDataInLocalStorage('user', JSON.stringify(createdUser));
            UserService.CurrentUser = createdUser;
            this.dialogRef.close();
            this.router.navigate(['/']);
          } 
        });
  }

}
