import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ContextStoreService } from '../store/context-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  public isActivated: boolean;

  constructor(public contextStoreService: ContextStoreService, public router: Router) {}

  public canActivate(): boolean {
    if (!this.isActivated) {
      this.router.navigate(['team-presence']);
      return this.isActivated;
    }
    return this.isActivated;
  }
}
