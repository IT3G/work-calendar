import { Document, Model } from 'mongoose';
import { DictionaryModel } from '../models/dictionary.model';

export class DictionaryBaseService {
  constructor(private readonly entity: Model<Document>) {}

  async getAll(): Promise<Document[]> {
    const result = await this.entity
      .find()
      .sort({ name: 'asc' })
      .exec();

    return result;
  }

  async getById(id: string): Promise<Document> {
    const result = await this.entity.findById(id).exec();
    return result;
  }

  async add(request: DictionaryModel): Promise<Document> {
    const result = await this.entity.create(request);
    return result.save();
  }

  async update(id: number, request: DictionaryModel): Promise<Document> {
    await this.entity.findByIdAndUpdate(id, request);
    return await this.entity.findById(id);
  }

  async delete(id: number): Promise<Document> {
    return await this.entity.findByIdAndDelete(id);
  }
}
