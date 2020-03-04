import { Controller, Get, HttpStatus, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { getConfig } from '../config/config';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Get()
  async getSettings() {
    const config = getConfig();

    const asycncSettings = await this.settingsService.getSettings();

    const settings = {
      FEATURE_AUTH_TYPE: config.FEATURE_AUTH_TYPE,
      FEATURE_AVATAR_SOURCE: config.FEATURE_AVATAR_SOURCE,
      FEATURE_FILE_STORAGE: config.FEATURE_FILE_STORAGE,
      MAIL_POSTFIX: config.MAIL_POSTFIX,
      PRINT_COMPANY_NAME: config.PRINT_COMPANY_NAME,
      PRINT_HEAD_MANAGER_NAME: config.PRINT_HEAD_MANAGER_NAME,
      PRINT_HEAD_MANAGER_POSITION: config.PRINT_HEAD_MANAGER_POSITION,
      FEATURE_WEB_PUSH: config.FEATURE_WEB_PUSH,
      PUSH_PUBLIC_KEY: config.PUSH_PUBLIC_KEY,
      LOGO_NAME: asycncSettings ? asycncSettings.logoName : null
    };

    return settings;
  }

  @Post('/logo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadResolution(@UploadedFile() file): Promise<void> {
    await this.settingsService.saveLogo(file);
    return;
  }

  @Get('/logo/:name')
  async getResolution(@Res() res: Response, @Param('name') name: string) {
    const logo = await this.settingsService.getLogo(name);

    res
      .set('content-disposition', `attachment; filename="${name}"`)
      .status(HttpStatus.OK)
      .send(logo);
  }
}
