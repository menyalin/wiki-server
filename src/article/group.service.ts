import { Model, Types } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { BadRequestException, Injectable } from '@nestjs/common';
import { Group, GroupDocument } from './schemas/group.schema';
import { CreateGroupDto } from './dto/createGroup.dto';

@Injectable()
export class GroupService {
  constructor(@InjectModel('Group') private GroupModel: Model<GroupDocument> ) {}

  async getAll(): Promise<Group[]> {
    return await this.GroupModel.find().sort('listIndex').lean()
  }

  async getById(id: Types.ObjectId): Promise<Group> {
    return await this.GroupModel.findById(id).lean()
  }

  async create(body: CreateGroupDto): Promise<Group> {
    return await this.GroupModel.create(body)
  } 

  async update(id: Types.ObjectId, body: CreateGroupDto): Promise<Group> {
    return await this.GroupModel.findByIdAndUpdate(id, body, { returnDocument: 'after' })
  }

  async deleteById(id: Types.ObjectId): Promise<void> {
    await this.GroupModel.deleteOne({ _id: id })
  }


}
