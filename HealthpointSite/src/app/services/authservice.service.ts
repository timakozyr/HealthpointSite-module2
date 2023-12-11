import { Injectable } from '@angular/core'; 
import { UserService } from './user.service';
 
@Injectable({ 
    providedIn: 'root' 
}) 
export class AuthService { 
    constructor() {
        if (localStorage.getItem('user') != null) {
            UserService.CurrentUser = this.getUserDetails();
        }
    } 
 
    getUserDetails() { 
        return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null; 
    } 
     
    setDataInLocalStorage(variableName, data) { 
        localStorage.setItem(variableName, data); 
    } 
 
    getToken() { 
        return localStorage.getItem('token') ?? ''; 
    }
 
    clearStorage() { 
        localStorage.clear(); 
    }
}