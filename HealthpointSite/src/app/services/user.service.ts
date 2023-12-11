import { Injectable } from '@angular/core';
import { User, UserProfile } from '../models/user';
import { ApiService } from './api.service';
import { AuthService } from './authservice.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _api : ApiService, private _auth : AuthService) {
  }

  static CurrentUser : User;

  static checkUser = () => localStorage.getItem("user") != null;

  createNewUserJson(input_user: any) {
    var to_return = new User;
    to_return.id = input_user.id;
    to_return.profile = UserProfile[input_user.role];
    to_return.email = input_user.email;
    to_return.first_name = input_user.first_name;
    to_return.last_name = input_user.last_name;
    to_return.patronymics = input_user.patronymic_name;
    to_return.city = input_user.city;
    to_return.FIO = to_return.last_name + " " + to_return.first_name + " " + to_return.patronymics;

    return to_return;
  }

  userToJson(user: User) {
    return {
      "email" : user.email,
      "first_name": user.first_name,
      "patronymic_name": user.patronymics,
      "last_name": user.last_name,
      "city": user.city,
      "password": user.password
    };
  }

  getAllUsers() : Observable<User[]> {
    return this._api.getTypeRequest('users').pipe(map((res: any) => res.map(r => this.createNewUserJson(r))));
  }

  getUserById(userId) : Observable<User> {
    return this._api.getTypeRequest(`users/${userId}`).pipe(map(res => this.createNewUserJson(res)));
  }

  deleteUser(id: number) {
    return this._api.deleteTypeRequest(`users/${id}`);
  }

  login(email: string, password: string) {
    return this._api.postTypeRequest('auth/login', {"email": email, "password": password});
  }

  registerPatient(user: User) {
    let b = this.userToJson(user);
    
    return this._api.postTypeRequest('users', b);
  }

  register(user: User) {
    let b = this.userToJson(user);
    
    return this._api.postTypeRequest('auth/signup', b);
  }
}
