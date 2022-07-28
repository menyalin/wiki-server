import { Controller, Post, Body, Put, Param, Get, HttpCode, Delete } from '@nestjs/common';


import { MenuService } from './menu.service'

import { IMenuItem } from 'src/interfaces/menuItem';

@Controller('menus')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  async getMenu(): Promise<IMenuItem[]> {
    return await this.menuService.getMenu()
  }


}
