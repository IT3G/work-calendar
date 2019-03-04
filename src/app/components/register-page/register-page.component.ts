import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registry-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  registryForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor(private authService: AuthService) {}

  ngOnInit() {}
  tryRegister() {
    const value = this.registryForm.value;
    this.authService.register(value).then(
      res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Your account has been created';
      },
      err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      }
    );
  }
}
