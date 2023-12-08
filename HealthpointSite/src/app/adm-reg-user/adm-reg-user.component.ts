import { Component, OnInit } from '@angular/core';
import { User, UserProfile } from '../models/user';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/authservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adm-reg-user',
  templateUrl: './adm-reg-user.component.html',
  styleUrls: ['./adm-reg-user.component.scss']
})
export class AdmRegUserComponent implements OnInit {
  
  user = new User(UserProfile.user);
  usrpassword!: string;
  constructor(public dialogRef: MatDialogRef<AdmRegUserComponent>,
              private _api : ApiService,
              private router : Router,
              private _auth : AuthService,
              public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    try {
      this.register();
    }
    catch {
    }
  }

  register() {
  }
}
