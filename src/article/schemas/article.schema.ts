import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Group } from './group.schema';

export type ArticleDocument = Article & Document;

@Schema({collection: 'articles'})
export class Article {
  _id: string

  @Prop({ required: true })
  title: string

  @Prop({default: 1000})
  listIndex: number

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Group' })
  group: Group

  @Prop({ required: true, unique: true, lowercase: true })
  slug: string
  
  @Prop({ required: true })
  description: string

  @Prop({ required: true })
  content: string
}

export const ArticleSchema = SchemaFactory.createForClass(Article)