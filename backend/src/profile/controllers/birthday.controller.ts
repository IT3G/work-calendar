import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { BirthdayService } from '../services/birthday.service';

@ApiBearerAuth()
@ApiUseTags('Birthday')
@Controller('birthday')
export class BirthdayController {
  constructor(private birthdayService: BirthdayService) {}
}
