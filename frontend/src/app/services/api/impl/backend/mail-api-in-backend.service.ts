import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SendMailRequestModel } from 'src/app/models/send.mail.request.model';
import { MailApiService } from '../../mail-api.service';

@Injectable({
  providedIn: 'root'
})
export class MailApiInBackendService implements MailApiService {
  req: SendMailRequestModel = {
    adress: ['bychkovei@it2g.ru'],
    author: 'Глотов Дмитрий',
    date: '24.05.2018',
    user: 'Бычков Егор',
    status: 'Болен'
  };

  constructor(private http: HttpClient) {}

  public sendMail(req: SendMailRequestModel) {
    const url = '/backend/mail';
    return this.http.post(url, this.req);
  }
}
