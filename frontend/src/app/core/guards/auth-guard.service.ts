import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ContextStoreService } from '../store/context-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public contextStoreService: ContextStoreService, public router: Router) {}

  public canActivate(): Observable<boolean> {
    return this.contextStoreService.getCurrentUser$().pipe(
      filter(u => !!u),
      map(u => !!u)
    );
  }
}
