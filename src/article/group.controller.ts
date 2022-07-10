import { Controller, Post, Body, Put, Param, Get, HttpCode, Delete } from '@nestjs/common';
import { CreateGroupDto } from './dto/createGroup.dto';
import { GroupService } from './group.service';
import { Group } from './schemas/group.schema';

@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post()
  async create (@Body() body: CreateGroupDto):Promise<Group> {
    return await this.groupService.create(body)
  }

  @Put(':id')
  async update(@Param() id: string, @Body() body: CreateGroupDto ): Promise<Group>{
    return await this.groupService.update(id, body)
  }

  @Get()
  async getAll(): Promise<Group[]> {
    return await this.groupService.getAll()
  }

  @Get(':id')
  async getById(@Param() id: string): Promise<Group> {
    return await this.groupService.getById(id)
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteById(@Param() id: string): Promise<void> {
    await this.groupService.deleteById(id)
  }

}
