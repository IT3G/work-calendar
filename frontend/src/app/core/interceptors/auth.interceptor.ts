import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UNAUTHORIZED } from 'http-status-codes';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, first, switchMap, tap } from 'rxjs/operators';
import { LoginService } from 'src/app/login/services/login.service';
import { TokensPayload } from 'src/app/shared/models/tokens-payload.model';

import { AuthApiService } from '../services/auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshingTokens = false;
  private tokensSubject$ = new BehaviorSubject<TokensPayload>(null);

  constructor(private authService: AuthApiService, private loginService: LoginService) {}

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
        const isUnauthorized = err && err.status === UNAUTHORIZED;

        if (isUnauthorized) {
          if (isSessionInProgress && !this.isRefreshingTokens) {
            this.isRefreshingTokens = true;
            this.tokensSubject$.next(null);
            return this.authService.refreshTokens(refreshToken).pipe(
              tap(tokens => {
                this.loginService.onTokenRefresh(tokens);
                this.tokensSubject$.next(tokens);
                this.isRefreshingTokens = false;
              }),
              switchMap(tokens => {
                request = request.clone({
                  setHeaders: {
                    Authorization: tokens.accessKey,
                    RefreshToken: tokens.refreshToken
                  }
                });
                return next.handle(request);
              }),
              catchError(() => {
                this.isRefreshingTokens = false;
                this.loginService.onLogOut();
                return next.handle(request);
              })
            );
          }
          if (isSessionInProgress && this.isRefreshingTokens) {
            return this.tokensSubject$.pipe(
              filter(tokens => Boolean(tokens)),
              first(),
              switchMap(tokens => {
                request = request.clone({
                  setHeaders: {
                    Authorization: tokens.accessKey,
                    RefreshToken: tokens.refreshToken
                  }
                });
                return next.handle(request);
              })
            );
          }
          if (!isSessionInProgress) {
            this.loginService.onLogOut();
          }
          return next.handle(request);
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
