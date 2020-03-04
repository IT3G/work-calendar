import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SettingsEntity } from '../entity/entities/settings.entity';
import { FileStorageService } from '../file-storage/services/file-storage.service';

@Injectable()
export class SettingsService {
  private readonly logoFolder = 'logo/';

  constructor(
    @InjectModel('Settings') private readonly settingsModel: Model<SettingsEntity>,
    private fileStorage: FileStorageService
  ) {}

  async saveLogo(file): Promise<void> {
    await this.createOrUpdateSettings({ logoName: file.originalname });

    await this.fileStorage.putObject(`${this.logoFolder}${file.originalname}`, file.buffer);
  }

  async getLogo(logoName: string): Promise<Buffer> {
    return await this.fileStorage.getObject(`${this.logoFolder}${logoName}`);
  }

  async deleteLogo(): Promise<void> {
    const settings = await this.getSettings();

    if (!settings || !settings.logoName) {
      return;
    }

    await this.fileStorage.removeObject(`${this.logoFolder}${settings.logoName}`);
    await this.createOrUpdateSettings({ logoName: null });
  }

  async getSettings(): Promise<SettingsEntity> {
    return await this.settingsModel.findOne();
  }

  async createOrUpdateSettings(newSettings: Partial<SettingsEntity>): Promise<SettingsEntity> {
    const settings = await this.getSettings();

    if (!settings) {
      return await this.settingsModel.create(newSettings);
    }

    return await this.settingsModel.findByIdAndUpdate(settings._id, newSettings);
  }
}
