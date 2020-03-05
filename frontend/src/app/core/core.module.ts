import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { PersonalMenuComponent } from './components/personal-menu/personal-menu.component';
import { ProjectsTeamsModule } from '../projects-teams/projects-teams.module';

const components = [NavigationMenuComponent, HeaderComponent];
@NgModule({
  declarations: [...components, PersonalMenuComponent],
  exports: [...components],
  imports: [CommonModule, SharedModule, ProjectsTeamsModule]
})
export class CoreModule {}
