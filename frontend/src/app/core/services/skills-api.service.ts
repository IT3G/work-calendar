import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { InputFile } from 'ngx-input-file';
import { Observable } from 'rxjs';
import { SkillsModel } from 'src/app/shared/models/skills.model';

import { environment } from '../../../environments/environment';
import { DictionaryNames } from '../../shared/models/dictionary-names.model';
import { DictionaryModel } from '../../shared/models/dictionary.model';

@Injectable({
  providedIn: 'root',
})
export class SkillsApiService {
  constructor(private http: HttpClient) {}

  private skillsUrl = 'skills';

  public getAll(): Observable<SkillsModel[]> {
    return this.http.get<SkillsModel[]>(`${environment.baseUrl}/${this.skillsUrl}`);
  }

  public getById(id: string): Observable<SkillsModel> {
    return this.http.get<SkillsModel>(`${environment.baseUrl}/${this.skillsUrl}/${id}`);
  }

  public getLogo(logoName: string): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/${this.skillsUrl}/logo/${logoName}`);
  }

  public createSkill(skill: SkillsModel): Observable<SkillsModel> {
    return this.http.post<SkillsModel>(`${environment.baseUrl}/${this.skillsUrl}`, skill);
  }

  public updateSkill(skill: SkillsModel): Observable<SkillsModel> {
    return this.http.put<SkillsModel>(`${environment.baseUrl}/${this.skillsUrl}/${skill._id}`, skill);
  }

  public uploadLogo(inputFile: InputFile): Observable<void> {
    const formData = new FormData();
    /** Добавляем файл для случаев с файловым хранилищем */
    if (inputFile && inputFile.file) {
      formData.append('file', inputFile.file);
    }

    return this.http.post<void>(`${environment.baseUrl}/${this.skillsUrl}/logo`, formData);
  }

  public deleteLogo(logoName: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/${this.skillsUrl}/logo/${logoName}`);
  }

  public deleteSkill(id: string): Observable<DictionaryModel> {
    return this.http.delete<DictionaryModel>(`${environment.baseUrl}/${this.skillsUrl}/${id}`);
  }
}
