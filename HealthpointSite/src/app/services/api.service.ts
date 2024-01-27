import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { map } from 'rxjs/operators'; 
import { AuthService } from './authservice.service';

 
@Injectable({ 
  providedIn: 'root' 
}) 
export class ApiService { 
 
 
  private REST_API_SERVER = "http://localhost:8000/api/"; 
  constructor(private httpClient: HttpClient) { } 


  getTypeRequest(url) {
    return this.httpClient.get(this.REST_API_SERVER+url).pipe(map(res => { 
      return res; 
    })); 
  } 
 
  postTypeRequest(url, payload) { 
    return this.httpClient.post(this.REST_API_SERVER+url+'/', payload).pipe(map(res => { 
      return res; 
    })); 
  } 
 
  putTypeRequest(url, payload) { 
    return this.httpClient.put(this.REST_API_SERVER+url+'/', payload).pipe(map(res => { 
      return res; 
    })) 
  }

  deleteTypeRequest(url) {
    return this.httpClient.delete(this.REST_API_SERVER+url+'/').pipe(map(res => {
      return res;
    }))
  }
}