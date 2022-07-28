import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type GroupDocument = Group & mongoose.Document;

@Schema({collection: 'groups'})
export class Group {
  _id: string
  
  @Prop({ required: true })
  title: string

  @Prop({default: 1000})  
  listIndex: number
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Group' })
  group: Group | string | null
  
  @Prop({ type: Boolean, default: true })
  published: boolean
}

export const GroupSchema = SchemaFactory.createForClass(Group)