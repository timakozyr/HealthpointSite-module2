import { Injectable } from '@angular/core'; 
 
@Injectable({ 
    providedIn: 'root' 
}) 
export class AuthService { 
    constructor() { 
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