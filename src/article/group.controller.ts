import { Controller, Post, Body, Put, Param, Get, HttpCode, Delete } from '@nestjs/common';
import { ParseObjectIdPipe } from 'src/pipes/parseObjectIdPipe';
import { CreateGroupDto } from './dto/createGroup.dto';
import { GroupService } from './group.service';
import { Group } from './schemas/group.schema';
import { Types} from 'mongoose'

@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post()
  async create (@Body() body: CreateGroupDto):Promise<Group> {
    return await this.groupService.create(body)
  }

  @Put(':id')
  async update(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @Body() body: CreateGroupDto ): Promise<Group>{
    return await this.groupService.update(id, body)
  }

  @Get()
  async getAll(): Promise<Group[]> {
    return await this.groupService.getAll()
  }

  @Get(':id')
  async getById(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<Group> {
    return await this.groupService.getById(id)
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteById(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<void> {
    await this.groupService.deleteById(id)
  }

}
