import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SkillsEntity } from 'src/entity/entities/skills.entity.model';
import { FileStorageService } from 'src/file-storage/services/file-storage.service';
import { SkillsDto } from './dto/skills.dto';

@Injectable()
export class SkillsService {
  private logoFolder = 'skills/';

  constructor(
    @InjectModel('Skills') private readonly skillsModel: Model<SkillsEntity>,
    private fileStorage: FileStorageService
  ) {}

  async getOneSkill(id: string): Promise<SkillsEntity> {
    return await this.skillsModel.findOne({ _id: id });
  }

  async getSkills(): Promise<SkillsEntity[]> {
    return await this.skillsModel.find();
  }

  async createSkill(newSkill: Partial<SkillsEntity>): Promise<SkillsEntity> {
    const createdSkill = await this.skillsModel.create(newSkill);
    return await this.getOneSkill(createdSkill._id);
  }

  async updateSkill(id: string, newSkill: Partial<SkillsEntity>): Promise<SkillsEntity> {
    const skill = await this.getOneSkill(id);
    if (!skill) {
      await this.skillsModel.create(skill);
      return await this.getOneSkill(id);
    }

    await this.skillsModel.findByIdAndUpdate(skill._id, newSkill);
    return await this.getOneSkill(id);
  }

  async saveLogo(file): Promise<void> {
    await this.fileStorage.putObject(`${this.logoFolder}${file.originalname}`, file.buffer);
  }

  async deleteLogo(logoName: string): Promise<void> {
    await this.fileStorage.removeObject(`${this.logoFolder}${logoName}`);
  }

  async deleteSkill(id: string): Promise<void> {
    await this.skillsModel.findOneAndDelete({ _id: id });
  }

  async getLogo(logoName: string): Promise<Buffer> {
    return await this.fileStorage.getObject(`${this.logoFolder}${logoName}`);
  }
}
