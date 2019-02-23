import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export abstract class EmployeeApiService {
  constructor() {}

  abstract load();
}
