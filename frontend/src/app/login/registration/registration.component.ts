import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { AuthApiService } from '../../core/services/auth-api.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public registrationForm: FormGroup;

  constructor(
    private authService: AuthApiService,

    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.initForm();
  }
  public registry() {
    const formData = this.registrationForm.value;
    const credentials = {
      username: formData.username,
      password: formData.password,
      name: `${formData.lastName} ${formData.firstName}`
    };
    this.authService
      .registration(credentials)
      .pipe(switchMap(() => this.authService.login({ username: credentials.username, password: credentials.password })))
      .subscribe(
        res => this.loginService.onSuccessedLogin(res),
        () => this.loginService.onError('Ошибка при регистрации')
      );
  }

  private initForm(): void {
    this.registrationForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required)
    });
  }
}
