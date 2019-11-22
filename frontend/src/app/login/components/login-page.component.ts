import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthApiService } from '../../core/services/auth-api.service';
import { EmployeeApiService } from '../../core/services/employee-api.service';
import { ContextStoreService } from '../../core/store/context-store.service';
import { EmployeeStoreService } from '../../core/store/employee-store.service';
import { Employee } from '../../shared/models/employee.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public errorMessage: string;
  public loginForm: FormGroup;
  public hasRegistration$: Observable<boolean>;

  constructor(
    private authService: AuthApiService,
    private contextStoreService: ContextStoreService,
    private employeeStoreService: EmployeeStoreService,
    private employeeApiService: EmployeeApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.hasRegistration$ = this.contextStoreService.settings$.pipe(
      filter(s => !!s),
      map(s => s.FEATURE_AUTH_TYPE === 'PASSWORD')
    );
  }

  public login() {
    this.authService
      .login(this.loginForm.value)
      .subscribe(res => this.successedLogin(res), err => this.erroredLogin(err), () => this.finishedLogin());
  }

  private initForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  private successedLogin(res: Employee): void {
    localStorage.setItem('userSession', JSON.stringify(res._id));
    this.contextStoreService.setCurrentUser(res);
  }

  private erroredLogin(err: { error: string }): void {
    this.errorMessage = err.error;
  }

  private finishedLogin(): void {
    this.employeeStoreService.update();
    this.contextStoreService.updater().subscribe(() => {
      this.employeeApiService
        .searchUserById(this.contextStoreService.getCurrentUser()._id)
        .subscribe((key: Employee) => {
          this.contextStoreService.setCurrentUser(key);
        });
    });

    this.router.navigate(['/presence']);
  }
}
