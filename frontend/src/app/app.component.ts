import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SwPush } from '@angular/service-worker';
import * as moment from 'moment';
import { combineLatest, EMPTY, from, Subscription } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';
import { ConfigurationApiService } from './core/services/configuration-api.service';
import { GitInfoService } from './core/services/git-info.service';
import { PushApiService } from './core/services/push-api.service';
import { ContextStoreService } from './core/store/context-store.service';

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

  @HostBinding('class.thirdSeptember') isThirdSeptember: boolean = false;

  ngOnInit() {
    this.checkIsThirdSeptember();
    this.getSettings();
    this.initWebPush();

    this.contextStoreService.settings$.subscribe(s => this.addGitVersionToPageTitle(s?.TITLE));
  }

  private checkIsThirdSeptember() {
    const now = moment();
    this.isThirdSeptember = now.date() === 3 && now.month() === 8;
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

  private getSettings() {
    this.configurationApi.loadSettings().subscribe(res => this.contextStoreService.settings$.next(res));
  }

  /** Добавление версии в заголовок */
  private addGitVersionToPageTitle(title: string): void {
    const currentTitle = title || this.title.getTitle();

    this.gitInfo.getVersionAsString().subscribe(version => {
      this.title.setTitle(`${currentTitle} (версия от ${version})`);
    });
  }
}
