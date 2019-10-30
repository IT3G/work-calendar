import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { AuthApiService } from 'src/app/services/api/auth-api.service';
import { ContextStoreService } from 'src/app/store/context-store.service';
import { EmployeeStoreService } from 'src/app/store/employee-store.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  loginForm: FormGroup;
  authServiceSub: Subscription;

  constructor(
    private authService: AuthApiService,
    private contextStoreService: ContextStoreService,
    private employeeStoreService: EmployeeStoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  public login() {
    this.authServiceSub = this.authService
      .login(this.loginForm.value)
      .subscribe(res => this.successedLogin(res), err => this.erroredLogin(err), () => this.finishedLogin());
  }

  private initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  private successedLogin(res: Employee) {
    localStorage.setItem('userSession', JSON.stringify(res._id));
    this.contextStoreService.setCurrentUser(res);
    this.successMessage = 'Добро пожаловать';
    this.errorMessage = null;
  }

  private erroredLogin(err: { error: string }) {
    this.errorMessage = err.error;
    this.successMessage = null;
  }

  private finishedLogin() {
    this.employeeStoreService.update();
    this.router.navigate(['/presence']);
  }

  public onEnter(e: KeyboardEvent) {
    if (e.keyCode === 13) this.login();
  }
}
