import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ProfileHistoryComponent } from './components/profile-history/profile-history.component';
import { ProfilePageComponent } from './components/profile-page.component';
import { ProfileProjectsChartComponent } from './components/profile-projects/profile-projects-chart/profile-projects-chart.component';
import { ProfileProjectsTableComponent } from './components/profile-projects/profile-projects-table/profile-projects-table.component';
import { ProfileProjectsComponent } from './components/profile-projects/profile-projects.component';
import { ProfileSkillsComponent } from './components/profile-skills/profile-skills.component';
import { ProfileSubscriptionsComponent } from './components/profile-subscriptions/profile-subscriptions.component';

const components = [
  ProfilePageComponent,
  ProfileHistoryComponent,
  ProfileSubscriptionsComponent,
  ProfileFormComponent,
  ProfileProjectsComponent,
  ProfileProjectsChartComponent,
  ProfileProjectsTableComponent,
  ProfileSkillsComponent,
];

@NgModule({
  declarations: [...components],
  imports: [MaterialModule, CommonModule, SharedModule],
})
export class ProfileModule {}
