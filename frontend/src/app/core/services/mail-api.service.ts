import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SendMailRequestModel } from '../../shared/models/send-mail.request.model';
import { SendingTaskModel } from '../../shared/models/sending-task.model';

@Injectable({
  providedIn: 'root'
})
export class MailApiService {
  constructor(private http: HttpClient) {}

  public sendMail(req: SendMailRequestModel): Observable<SendingTaskModel> {
    return this.http.post<SendingTaskModel>(`${environment.baseUrl}/backend/mail`, req);
  }
}
