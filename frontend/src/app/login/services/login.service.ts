import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { TokensPayload } from 'src/app/shared/models/tokens-payload.model';

import { ContextStoreService } from '../../core/store/context-store.service';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private contextStoreService: ContextStoreService,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  onSuccessedLogin(res: TokensPayload): void {
    console.log(123);
    localStorage.setItem('Authorization', res.accessToken);
    localStorage.setItem('RefreshToken', res.refreshToken);
    this.contextStoreService.setCurrentUser(res.user);
    this.router.navigate(['presence', res?.user?.mailNickname]);
  }

  onError(errText = 'Произошла ошибка') {
    this.snackbar.showErrorSnackBar(errText);
  }

  onLogOut(): void {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('RefreshToken');
    this.contextStoreService.setCurrentUser(null);
    this.router.navigate(['login']);
  }

  onTokenRefresh({ accessToken, refreshToken }: TokensPayload): void {
    localStorage.setItem('Authorization', accessToken);
    localStorage.setItem('RefreshToken', refreshToken);
  }
}
