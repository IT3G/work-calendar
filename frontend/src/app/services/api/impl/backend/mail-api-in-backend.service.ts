import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SendMailRequestModel } from 'src/app/models/send-mail.request.model';
import { SendingTaskModel } from 'src/app/models/sending-task.model';
import { MailApiService } from '../../mail-api.service';

@Injectable({
  providedIn: 'root'
})
export class MailApiInBackendService implements MailApiService {
  constructor(private http: HttpClient) {}

  public sendMail(req: SendMailRequestModel): Observable<SendingTaskModel> {
    return this.http.post<SendingTaskModel>('/backend/mail', req);
  }
}
