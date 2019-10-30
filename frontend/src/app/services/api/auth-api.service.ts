import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequestModel } from 'src/app/models/auth.request.model';

@Injectable({
  providedIn: 'root'
})
export abstract class AuthApiService {
  constructor() {}

  public abstract login(req: AuthRequestModel): Observable<any>;
}
