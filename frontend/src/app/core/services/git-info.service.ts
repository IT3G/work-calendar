import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, interval, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

/** Сервис дает возможность просмотра информации из гита по последнему коммиту сборки */
@Injectable({
  providedIn: 'root'
})
export class GitInfoService {
  private initializationTimestamp = moment().format('YYYY-MM-DD HH:mm:SS');
  private version$ = new BehaviorSubject(null);
  private isVersionUpdated$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    this.http
      .get<any>('assets/git-info.json')
      .pipe(
        tap((version) => {
          this.version$.next(version.git);
          this.addGitInfoToConsole();
        }),
        switchMap(() => interval(2 * 60 * 1000)),
        switchMap(() => this.http.get('assets/git-info.json').pipe(catchError((err) => of(err))))
      )
      .subscribe((res: any) => {
        if (res.sha && this.version$.getValue().git.sha !== res.git.sha) {
          this.isVersionUpdated$.next(true);
        }
      });
  }

  /** Возвращает проверку обновления версии гита */
  public checkIsVersionUpdated(): Observable<boolean> {
    return this.isVersionUpdated$;
  }

  /** Сбрасывает результаты проверки версии */
  public removeVersionUpdated(): void {
    this.isVersionUpdated$.next(false);
  }

  /** Получение инфы в виде строки */
  public getVersionAsString(): Observable<string> {
    return this.version$.pipe(
      filter((v) => !!v),
      map((version) => {
        const date = moment(version.committerDate);
        const result = `${date.format('DD.MM.YYYY HH:mm:ss')}`;

        return result;
      })
    );
  }

  /** Добавляет возможность смотреть инфу по гиту из консоли */
  private addGitInfoToConsole(): void {
    window['gitInfo'] = () => {
      const info = {
        ...this.version$.getValue(),
        app: {
          initializationTimestamp: this.initializationTimestamp
        }
      };
      console.log(info);
    };
  }
}
