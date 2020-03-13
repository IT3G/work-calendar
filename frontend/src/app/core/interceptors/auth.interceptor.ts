import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UNAUTHORIZED } from 'http-status-codes';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ContextStoreService } from '../store/context-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private context: ContextStoreService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = localStorage.getItem('Authorization');
    const refreshToken = localStorage.getItem('RefreshToken');

    if (jwt && refreshToken) {
      request = request.clone({
        setHeaders: {
          Authorization: jwt,
          RefreshToken: refreshToken
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err && err.status === UNAUTHORIZED) {
          this.context.setCurrentUser(null);
          localStorage.removeItem('Authorization');
          this.router.navigateByUrl('/login');
        }

        return next.handle(request);
      })
    );
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
