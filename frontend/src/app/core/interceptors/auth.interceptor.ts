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
import { LoginService } from 'src/app/login/services/login.service';

import { AuthApiService } from '../services/auth-api.service';
import { ContextStoreService } from '../store/context-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private context: ContextStoreService,
    private authService: AuthApiService,
    private loginService: LoginService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = localStorage.getItem('Authorization');
    const refreshToken = localStorage.getItem('RefreshToken');

    const isSessionInProgress = Boolean(jwt && refreshToken);

    if (isSessionInProgress) {
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
          if (isSessionInProgress) {
            this.authService.refreshTokens(refreshToken).subscribe(
              tokens => this.loginService.onTokenRefresh(tokens),
              () => this.loginService.onLogOut()
            );
          } else {
            this.context.setCurrentUser(null);
            this.router.navigate(['login']);
          }
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
