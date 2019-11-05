import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SendMailRequestModel } from 'src/app/models/send-mail.request.model';
import { SendingTaskModel } from 'src/app/models/sending-task.model';

@Injectable({
  providedIn: 'root'
})
export abstract class MailApiService {
  constructor() {}

  abstract sendMail(req: SendMailRequestModel): Observable<SendingTaskModel>;
}
