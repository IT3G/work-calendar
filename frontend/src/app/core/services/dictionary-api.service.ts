import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DictionaryNames } from '../../shared/models/dictionary-names.model';
import { DictionaryModel } from '../../shared/models/dictionary.model';

@Injectable({
  providedIn: 'root'
})
export class DictionaryApiService {
  constructor(private http: HttpClient) {}

  public getAll(dictionary: DictionaryNames): Observable<DictionaryModel[]> {
    return this.http.get<DictionaryModel[]>(`${environment.baseUrl}/${dictionary}`);
  }

  public getById(dictionary: DictionaryNames, id: string): Observable<DictionaryModel> {
    return this.http.get<DictionaryModel>(`${environment.baseUrl}/${dictionary}/${id}`);
  }

  public add(dictionary: DictionaryNames, request: DictionaryModel): Observable<DictionaryModel> {
    return this.http.post<DictionaryModel>(`${environment.baseUrl}/${dictionary}`, request);
  }

  public update(dictionary: DictionaryNames, request: DictionaryModel): Observable<DictionaryModel> {
    return this.http.put<DictionaryModel>(`${environment.baseUrl}/${dictionary}`, request);
  }

  public delete(dictionary: DictionaryNames, id: string): Observable<DictionaryModel> {
    return this.http.delete<DictionaryModel>(`${environment.baseUrl}/${dictionary}/${id}`);
  }
}
