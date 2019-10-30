import { Injectable } from '@angular/core';
import { SendMailRequestModel } from 'src/app/models/send.mail.request.model';

@Injectable({
  providedIn: 'root'
})
export abstract class MailApiService {
  constructor() {}

  abstract sendMail(req: SendMailRequestModel);
}
