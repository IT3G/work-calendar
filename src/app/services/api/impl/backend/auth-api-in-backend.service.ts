import { Injectable } from '@angular/core';
import { AuthApiService } from '../../auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiInBackendService implements AuthApiService {
  constructor() {}

  login() {}
}
