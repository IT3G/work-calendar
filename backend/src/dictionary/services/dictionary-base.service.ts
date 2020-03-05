import { Document, Model } from 'mongoose';
import { DictionaryDto } from '../dto/dictionary.dto';

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

  async add(request: DictionaryDto): Promise<Document> {
    const result = await this.entity.create(request);
    return result.save();
  }

  async update(request: DictionaryDto): Promise<Document> {
    await this.entity.findByIdAndUpdate(request._id, request);
    return await this.entity.findById(request._id);
  }

  async delete(id: number): Promise<Document> {
    return await this.entity.findByIdAndDelete(id);
  }
}
