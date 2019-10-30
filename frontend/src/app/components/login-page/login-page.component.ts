import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from 'src/app/services/api/auth-api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  loginForm: FormGroup;
  constructor(private authService: AuthApiService) {}

  ngOnInit() {
    this.initForm();
  }

  login() {}

  private initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }
}
