import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthApiService } from '../../core/services/auth-api.service';
import { ContextStoreService } from '../../core/store/context-store.service';
import { Employee } from '../../shared/models/employee.model';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public registrationForm: FormGroup;
  public successRegistration = false;
  constructor(
    private authService: AuthApiService,
    private snackbar: SnackbarService,
    private router: Router,
    private contextStoreService: ContextStoreService
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
      .pipe(
        switchMap(res => this.authService.login({ username: credentials.username, password: credentials.password }))
      )
      .subscribe(
        res => this.successedLogin(res),
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

  private successedLogin(res: Employee): void {
    localStorage.setItem('Authorization', res.accessKey);
    this.contextStoreService.setCurrentUser(res);
    this.router.navigate(['/presence']);
  }
}
