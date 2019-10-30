import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ContextStoreService } from '../store/context-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public contextStoreService: ContextStoreService, public router: Router) {}

  canActivate(): boolean {
    if (!this.contextStoreService.getCurrentUser()) {
      this.router.navigate(['team-presence']);
      return false;
    }
    return true;
  }
}
