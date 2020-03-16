import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProjectsTeamsModule } from '../projects-teams/projects-teams.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { PersonalMenuComponent } from './components/personal-menu/personal-menu.component';
import { UserSearchComponent } from './components/user-search/user-search.component';

const components = [NavigationMenuComponent, PersonalMenuComponent, HeaderComponent, UserSearchComponent];
@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [CommonModule, SharedModule, ProjectsTeamsModule]
})
export class CoreModule {}
