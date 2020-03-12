import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthApiService } from '../../core/services/auth-api.service';
import { ContextStoreService } from '../../core/store/context-store.service';
import { SettingsModel } from '../../shared/models/settings.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;
  public settings$: Observable<SettingsModel>;

  constructor(
    private authService: AuthApiService,
    private contextStoreService: ContextStoreService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.initForm();
    this.settings$ = this.contextStoreService.settings$.pipe(filter(s => !!s));
  }

  public login() {
    const info = this.loginForm.value;
    info.username = info.username.toLowerCase();
    this.authService.login(info).subscribe(
      res => this.loginService.onSuccessedLogin(res),
      err => this.loginService.onError('Не верный логин или пароль')
    );
  }

  private initForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }
}
