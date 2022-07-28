import { Test, TestingModule } from '@nestjs/testing';
import { MenuService } from './menu.service';
import { getModelToken } from '@nestjs/mongoose';
import { Article } from './schemas/article.schema';
import { Group  } from './schemas/group.schema';
import { Model } from 'mongoose';

describe('MenuService', () => {
  let menuService: MenuService;
  let GroupModel: Model<Group>;
  let ArticleModel: Model<Article>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuService,
        {
          provide: getModelToken('Group'),
          useValue: {  find: jest.fn(), exec: jest.fn()},
        },
        {
          provide: getModelToken('Article'),         
          useValue: { find: jest.fn(), exec: jest.fn()},
        },
      ],
    }).compile();

    menuService = module.get<MenuService>(MenuService);
    GroupModel = module.get<Model<Group>>(getModelToken('Group'));
    ArticleModel = module.get<Model<Article>>(getModelToken('Article'));
  });

  it('should be defined', () => {
    expect(menuService).toBeDefined();
  });

  it('empty groups & articles', async () => {
    jest.spyOn(GroupModel, 'find').mockReturnValue({
      lean: jest.fn().mockResolvedValue([]),
    } as any);

    jest.spyOn(ArticleModel, 'find').mockReturnValue({
      lean: jest.fn().mockResolvedValue([]),
    } as any); 
    expect(await menuService.getMenu()).toEqual([])
  })


  it('one root element', async () => {
    const groups = [
      {_id: '1', group: '1'}, 
      {_id: '2', group: '212'}, 
      {_id: '3', title: 'Группа'}, 
    ]
    const articles = [
      {_id: '4', group: '1'}, 
      {_id: '5', group: '212'}, 
      {_id: '6', title: 'Группа'}, 
    ]
    jest.spyOn(GroupModel, 'find').mockReturnValue({
      lean: jest.fn().mockResolvedValue(groups),
    } as any);

    jest.spyOn(ArticleModel, 'find').mockReturnValue({
      lean: jest.fn().mockResolvedValue(articles),
    } as any); 
    const rootMenu = await menuService.getMenu()
    expect(rootMenu).toHaveLength(2)
  })

  it('one nested element', async () => {
    const groups = [ {_id: '3', title: 'Группа'}, ]
    const articles = [{_id: '1', group: '3', title: 'nested group'}]
    
    jest.spyOn(GroupModel, 'find').mockReturnValue({
      lean: jest.fn().mockResolvedValue(groups),
    } as any);

    jest.spyOn(ArticleModel, 'find').mockReturnValue({
      lean: jest.fn().mockResolvedValue(articles),
    } as any); 
    const menu = await menuService.getMenu()
    expect(menu[0].subItems).toHaveLength(1)
  })

    it('few nested element', async () => {
    const groups = [ 
      {_id: '2', title: 'Группа2'}, 
      {_id: '3', title: 'Группа3', group: '2'} ]
    const articles = [
      {_id: '4', group: '2', title: 'nested title'},
      {_id: '5', group: '3', title: 'deep nested title'},
    ]
    
    jest.spyOn(GroupModel, 'find').mockReturnValue({
      lean: jest.fn().mockResolvedValue(groups),
    } as any);

    jest.spyOn(ArticleModel, 'find').mockReturnValue({
      lean: jest.fn().mockResolvedValue(articles),
    } as any); 
    const menu = await menuService.getMenu()
    expect(menu[0].subItems[1].subItems).toHaveLength(1)
  })


});