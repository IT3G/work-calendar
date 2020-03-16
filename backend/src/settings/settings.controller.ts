import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { getConfig } from '../config/config';
import { SettingsDto } from './dto/settings.dto';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { SettingsService } from './settings.service';

const encodeUrl = require('encodeurl');

@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Get()
  async getSettings(): Promise<SettingsDto> {
    const asycncSettings = await this.settingsService.getSettings();

    return this.mapSettings(asycncSettings);
  }

  @Post()
  async updateAsyncSettings(@Body() settings: Partial<UpdateSettingsDto>): Promise<SettingsDto> {
    const asyncSettings = await this.settingsService.createOrUpdateSettings(settings);

    return this.mapSettings(asyncSettings);
  }

  @Post('/logo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadLogo(@UploadedFile() file): Promise<void> {
    await this.settingsService.saveLogo(file);
    return;
  }

  @Get('/logo/:name')
  async getLogo(@Res() res: Response, @Param('name') name: string) {
    const logo = await this.settingsService.getLogo(name);

    res
      .set('content-disposition', `attachment; filename="${encodeUrl(name)}"`)
      .status(HttpStatus.OK)
      .send(logo);
  }

  @Delete('/logo')
  async deleteLogo(): Promise<void> {
    return await this.settingsService.deleteLogo();
  }

  private mapSettings(asycncSettings: UpdateSettingsDto): SettingsDto {
    const config = getConfig();

    return {
      FEATURE_AUTH_TYPE: config.FEATURE_AUTH_TYPE,
      FEATURE_AVATAR_SOURCE: config.FEATURE_AVATAR_SOURCE,
      FEATURE_FILE_STORAGE: config.FEATURE_FILE_STORAGE,
      MAIL_POSTFIX: config.MAIL_POSTFIX,
      PRINT_COMPANY_NAME: config.PRINT_COMPANY_NAME,
      PRINT_HEAD_MANAGER_NAME: config.PRINT_HEAD_MANAGER_NAME,
      PRINT_HEAD_MANAGER_POSITION: config.PRINT_HEAD_MANAGER_POSITION,
      FEATURE_WEB_PUSH: config.FEATURE_WEB_PUSH,
      PUSH_PUBLIC_KEY: config.PUSH_PUBLIC_KEY,
      LOGO_NAME: asycncSettings?.logoName,
      TITLE: asycncSettings?.title
    };
  }
}
