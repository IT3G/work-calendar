import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription, combineLatest, from, EMPTY } from 'rxjs';
import { ConfigurationApiService } from './core/services/configuration-api.service';
import { EmployeeApiService } from './core/services/employee-api.service';
import { GitInfoService } from './core/services/git-info.service';
import { ContextStoreService } from './core/store/context-store.service';
import { SwPush } from '@angular/service-worker';
import { filter, switchMap, catchError } from 'rxjs/operators';
import { PushApiService } from './core/services/push-api.service';

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
    private configurationApi: ConfigurationApiService,
    private swPush: SwPush,
    private pushApi: PushApiService
  ) {}

  ngOnInit() {
    this.getInfoFromStore();
    this.addGitVersionToPageTitle();
    this.initWebPush();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initWebPush() {
    combineLatest([this.contextStoreService.getCurrentUser$(), this.contextStoreService.settings$])
      .pipe(
        filter(([user, config]) => !!config && !!user),
        filter(() => this.swPush.isEnabled),
        switchMap(([user, config]) =>
          from(this.swPush.requestSubscription({ serverPublicKey: config.PUSH_PUBLIC_KEY }))
        ),
        switchMap(sub => this.pushApi.createSubscription(this.contextStoreService.getCurrentUser().mailNickname, sub)),
        catchError(err => {
          console.log(err);
          return EMPTY;
        })
      )
      .subscribe(res => console.log(res));
  }

  private getInfoFromStore() {
    this.configurationApi.loadSettings().subscribe(res => this.contextStoreService.settings$.next(res));
  }

  /** Добавление версии в заголовок */
  private addGitVersionToPageTitle(): void {
    const currentTitle = this.title.getTitle();
    this.gitInfo.getVersionAsString().subscribe(version => {
      this.title.setTitle(`${currentTitle} (${version})`);
    });
  }
}
