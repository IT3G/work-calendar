import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';

const components = [NavigationMenuComponent, HeaderComponent];
@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [CommonModule, SharedModule]
})
export class CoreModule {}
