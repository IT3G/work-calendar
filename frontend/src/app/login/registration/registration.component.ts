import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from '../../core/services/auth-api.service';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public registrationForm: FormGroup;
  public successRegistration = false;
  constructor(private authService: AuthApiService, private snackbar: SnackbarService) {}

  ngOnInit() {
    this.initForm();
  }
  public registry() {
    const formData = this.registrationForm.value;
    const obj = {
      username: formData.username,
      password: formData.password,
      name: `${formData.lastName} ${formData.firstName}`
    };
    this.authService.registration(obj).subscribe(
      res => {
        this.successRegistration = true;
        this.snackbar.showSuccessSnackBar('Пользователь успешно добавлен');
      },
      err => this.snackbar.showErrorSnackBar('Произошла ошибка')
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
