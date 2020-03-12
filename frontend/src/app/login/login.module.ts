import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationComponent } from './components/registration/registration.component';

const components = [LoginPageComponent, RegistrationComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, SharedModule]
})
export class LoginModule {}
