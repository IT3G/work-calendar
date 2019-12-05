import { Document, Model } from 'mongoose';

export class DictionaryBaseService<T extends Document, K> {
  constructor(private readonly entity: Model<T>) {}

  async getAll(): Promise<T[]> {
    const result = await this.entity
      .find()
      .sort({ name: 'asc' })
      .exec();

    return result;
  }

  async getById(id: string): Promise<T> {
    const result = await this.entity.findById(id).exec();
    return result;
  }

  async add(request: K): Promise<T> {
    const result = await this.entity.create(request);
    return result.save();
  }

  async update(id: number, request: K): Promise<T> {
    await this.entity.findByIdAndUpdate(id, request);
    return await this.entity.findById(id);
  }

  async delete(id: number): Promise<T> {
    return await this.entity.findByIdAndDelete(id);
  }
}
