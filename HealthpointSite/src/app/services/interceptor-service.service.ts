import { Injectable } from '@angular/core'; 
import { HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http'; 
import { Observable} from 'rxjs'; 
import { AuthService } from './authservice.service';
 
@Injectable({ 
  providedIn: 'root' 
}) 
export class InterceptorService { 
 
  constructor(private _auth: AuthService) { }
 
  intercept( 
    request: HttpRequest<any>, 
    next: HttpHandler 
  ): Observable<HttpEvent<any>> { 
    if (!request.headers.has('Content-Type')) { 
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') }); 
    }
    request = request.clone({ headers: request.headers.set('accept', 'application/json') })
    if (this._auth.getToken() != '') {
      request = request.clone({ 
        setHeaders: {
          Authorization: `Token ${this._auth.getToken()}` 
        } 
      });
    }
 
    return next.handle(request) 
  } 
}