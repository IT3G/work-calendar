import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription, combineLatest, from, EMPTY } from 'rxjs';
import { ConfigurationApiService } from './core/services/configuration-api.service';
import { GitInfoService } from './core/services/git-info.service';
import { ContextStoreService } from './core/store/context-store.service';
import { SwPush } from '@angular/service-worker';
import { filter, switchMap, catchError } from 'rxjs/operators';
import { PushApiService } from './core/services/push-api.service';
import { environment } from '../environments/environment';

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
        filter(() => this.swPush.isEnabled),
        filter(([user, config]) => !!user && !!config && config.FEATURE_WEB_PUSH === 'YES'),
        switchMap(([user, config]) =>
          from(this.swPush.requestSubscription({ serverPublicKey: config.PUSH_PUBLIC_KEY }))
        ),
        switchMap(sub => this.pushApi.createSubscription(this.contextStoreService.getCurrentUser().mailNickname, sub)),
        catchError(err => {
          console.log(err);
          return EMPTY;
        })
      )
      .subscribe();
  }

  private getInfoFromStore() {
    this.configurationApi.loadSettings().subscribe(res => this.contextStoreService.settings$.next(res));
  }

  /** Добавление версии в заголовок */
  private addGitVersionToPageTitle(): void {
    const currentTitle = this.getPageTitle();

    this.gitInfo.getVersionAsString().subscribe(version => {
      this.title.setTitle(`${currentTitle} (версия от ${version})`);
    });
  }

  private getPageTitle(): string {
    if (environment.pageTitle) {
      return environment.pageTitle;
    }
    return this.title.getTitle();
  }
}
