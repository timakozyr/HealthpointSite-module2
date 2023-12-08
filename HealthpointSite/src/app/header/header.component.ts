import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../services/user.service';
import { UserProfile } from '../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  UserProfileType = UserProfile;

  constructor(public router: Router, public dialog: MatDialog, userService: UserService) {
  }

  openAppointmentForm() {
    if (this.checkUser())
      this.dialog.open(AppointmentFormComponent);
    else
      this.dialog.open(LoginComponent, {width: '600px'});
  }

  openLoginForm() {
    this.dialog.open(LoginComponent, {width: '600px'});
  }

  checkUser() {
    return UserService.checkUser();
  }

  user() {
    return UserService.CurrentUser;
  }

  ngOnInit(): void {
  }
}
