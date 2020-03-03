import { Controller, Get } from '@nestjs/common';
import { getConfig } from '../config/config';

@Controller('settings')
export class SettingsController {
  @Get()
  async getSettings() {
    const config = getConfig();
    const settings = {
      FEATURE_AUTH_TYPE: config.FEATURE_AUTH_TYPE,
      FEATURE_AVATAR_SOURCE: config.FEATURE_AVATAR_SOURCE,
      FEATURE_FILE_STORAGE: config.FEATURE_FILE_STORAGE,
      MAIL_POSTFIX: config.MAIL_POSTFIX,
      PRINT_COMPANY_NAME: config.PRINT_COMPANY_NAME,
      PRINT_HEAD_MANAGER_NAME: config.PRINT_HEAD_MANAGER_NAME,
      PRINT_HEAD_MANAGER_POSITION: config.PRINT_HEAD_MANAGER_POSITION,
      FEATURE_WEB_PUSH: config.FEATURE_WEB_PUSH,
      PUSH_PUBLIC_KEY: config.PUSH_PUBLIC_KEY
    };

    return settings;
  }
}
