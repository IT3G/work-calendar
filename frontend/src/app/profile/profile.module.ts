import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProfilePageComponent } from './components/profile-page.component';

const components = [ProfilePageComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, SharedModule]
})
export class ProfileModule {}
