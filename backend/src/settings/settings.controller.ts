import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { getConfig } from '../config/config';

@Controller('settings')
export class SettingsController {
  @Get()
  async getSettings(@Res() res) {
    const config = getConfig();
    const settings = {
      FEATURE_AUTH_TYPE: config.FEATURE_AUTH_TYPE,
      FEATURE_AVATAR_SOURCE: config.FEATURE_AVATAR_SOURCE,
      MAIL_POSTFIX: config.MAIL_POSTFIX,
      PRINT_COMPANY_NAME: config.PRINT_COMPANY_NAME,
      PRINT_HEAD_MANAGER_NAME: config.PRINT_HEAD_MANAGER_NAME,
      PRINT_HEAD_MANAGER_POSITION: config.PRINT_HEAD_MANAGER_POSITION
    };

    return res.status(HttpStatus.OK).json(settings);
  }
}
