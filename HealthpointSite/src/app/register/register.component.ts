import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
              public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.register();
  }

  register() {
    try {
      this.userService.register(this.user);
      this.dialogRef.close();
      this.router.navigate(['/']);
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
