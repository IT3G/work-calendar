import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ContextStoreService } from '../../core/store/context-store.service';
import { Employee } from '../../shared/models/employee.model';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private contextStoreService: ContextStoreService,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  onSuccessedLogin(res: Employee): void {
    localStorage.setItem('Authorization', res.accessKey);
    this.contextStoreService.setCurrentUser(res);
    this.router.navigate(['presence', res?.mailNickname]);
  }

  onError(errText = 'Произошла ошибка') {
    this.snackbar.showErrorSnackBar(errText);
  }

  onLogOut(): void {
    localStorage.removeItem('Authorization');
    this.contextStoreService.setCurrentUser(null);
    this.router.navigate(['login']);
  }
}
