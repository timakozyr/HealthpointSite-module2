import { Component, OnInit } from '@angular/core';
import { User, UserProfile } from '../models/user';
import { UserService } from '../services/user.service';
 
@Component({ 
  selector: 'app-profile', 
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'] 
}) 
export class ProfileComponent implements OnInit {
  user: User;
  UserProfileType = UserProfile;
  errorMsg: string;

  constructor() {
  }
 
  ngOnInit(): void {
    this.user = UserService.CurrentUser;
  }

}