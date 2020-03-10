import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthApiService } from '../../core/services/auth-api.service';
import { EmployeeApiService } from '../../core/services/employee-api.service';
import { ContextStoreService } from '../../core/store/context-store.service';
import { AuthSetting } from '../../shared/models/auth-setting.model';
import { Employee } from '../../shared/models/employee.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public errorMessage: string;
  public loginForm: FormGroup;
  public settings$: Observable<AuthSetting>;

  constructor(
    private authService: AuthApiService,
    private contextStoreService: ContextStoreService,
    private employeeApiService: EmployeeApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.settings$ = this.contextStoreService.settings$.pipe(filter(s => !!s));
  }

  public login() {
    const info = this.loginForm.value;
    info.username = info.username.toLowerCase();
    this.authService.login(info).subscribe(
      res => this.successedLogin(res),
      err => {
        this.errorMessage = err;
        console.log(err);
      }
    );
  }

  private initForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  private successedLogin(res: Employee): void {
    localStorage.setItem('Authorization', res.hashPassword);
    this.contextStoreService.setCurrentUser(res);
    this.router.navigate(['/presence']);
  }
}
