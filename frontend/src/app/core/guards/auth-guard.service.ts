import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AuthApiService } from '../services/auth-api.service';
import { ContextStoreService } from '../store/context-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public contextStoreService: ContextStoreService, public router: Router, public authApi: AuthApiService) {}

  public canActivate(): Observable<boolean> {
    return this.contextStoreService.getCurrentUser$().pipe(
      tap(u => {
        if (!u) {
          this.authApi
            .getCurrentUser()
            .subscribe(
              user => this.contextStoreService.setCurrentUser(user),
              err => this.router.navigateByUrl('/login')
            );
        }
      }),
      filter(u => !!u),
      map(u => !!u)
    );
  }

}
