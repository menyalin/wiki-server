import { Model, Types } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common';
import { Group, GroupDocument } from './schemas/group.schema';
import { CreateGroupDto } from './dto/createGroup.dto';

@Injectable()
export class GroupService {
  constructor(@InjectModel('Group') private GroupModel: Model<GroupDocument> ) {}

  async getAll(): Promise<Group[]> {
    return await this.GroupModel.find().sort('listIndex').lean()
  }

  async getById(id: string): Promise<Group> {
    return await this.GroupModel.findById(new Types.ObjectId(id)).lean()
  }

  async create(body: CreateGroupDto): Promise<Group> {
    return await this.GroupModel.create(body)
  } 

  async update(id: string, body: CreateGroupDto): Promise<Group> {
    return await this.GroupModel.findByIdAndUpdate(new Types.ObjectId(id), body, {returnDocument: 'after'})
  }

  async deleteById(id: string): Promise<void> {
    await this.GroupModel.deleteOne({_id: new Types.ObjectId(id)})
  }


}
