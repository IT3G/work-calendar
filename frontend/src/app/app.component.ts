import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ConfigurationApiService } from './core/services/configuration-api.service';
import { EmployeeApiService } from './core/services/employee-api.service';
import { GitInfoService } from './core/services/git-info.service';
import { ContextStoreService } from './core/store/context-store.service';
import { EmployeeStoreService } from './core/store/employee-store.service';
import { Employee } from './shared/models/employee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public userSession: string;
  public subscription = new Subscription();
  constructor(
    private title: Title,
    private gitInfo: GitInfoService,
    private contextStoreService: ContextStoreService,
    private employeeApiService: EmployeeApiService,
    private employeeStoreService: EmployeeStoreService,
    private configurationApi: ConfigurationApiService
  ) {}

  ngOnInit() {
    this.getInfoFromStore();
    this.addGitVersionToPageTitle();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getInfoFromStore() {
    this.getEmployees();
    this.subscription.add(this.employeeStoreService.updater().subscribe(() => this.getEmployees()));
    this.subscription.add(
      this.configurationApi.loadSettings().subscribe((res) => this.contextStoreService.settings$.next(res))
    );
  }

  private getEmployees(): void {
    this.subscription.add(
      this.employeeApiService.loadAllEmployees().subscribe((key: Employee[]) => {
        this.employeeStoreService.addEmployees(key);
      })
    );
  }

  /** Добавление версии в заголовок */
  private addGitVersionToPageTitle(): void {
    const currentTitle = this.title.getTitle();
    this.gitInfo.getVersionAsString().subscribe((version) => {
      this.title.setTitle(`${currentTitle} (${version})`);
    });
  }
}
