import { Model, Types } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common';
import { GroupDocument } from './schemas/group.schema';
import { ArticleDocument } from './schemas/article.schema';
import { IMenuItem } from 'src/interfaces/menuItem';

@Injectable()
export class MenuService {
  constructor(@InjectModel('Group') private GroupModel: Model<GroupDocument>, 
  @InjectModel('Article') private ArticleModel: Model<ArticleDocument> ) {}

  async getMenu () {
    const groups = await this.GroupModel.find({published: true}).lean()
    const articles = await this.ArticleModel.find({published: true}).lean()
    const items:IMenuItem[] = []
    items.push(...groups.filter(i => !i.group))
    items.push(...articles.filter(i => !i.group))

    const _getSubItems = (groupId: string): IMenuItem[] => {
      const tmpRes = [...articles.filter((item => item.group?.toString() === groupId))]
      const tmpGroups = groups.filter((item => item.group?.toString() === groupId))
      if (tmpGroups.length === 0) return tmpRes
      return [...tmpRes, ...tmpGroups.map(g => ({
        ...g,
        subItems: _getSubItems(g._id.toString())
      }))]
    }
    items.forEach(item => {
      if (!item.slug) {
        item.subItems = _getSubItems(item._id.toString())  
      }
    })
    return items
  }


}
