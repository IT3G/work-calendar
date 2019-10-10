import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class AuthApiService {
  constructor() {}

  abstract login();
}
