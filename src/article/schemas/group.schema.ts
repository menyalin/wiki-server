import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema({collection: 'groups'})
export class Group {
  _id: string

  @Prop({ required: true })
  title: string

  @Prop({default: 1000})
  listIndex: number
}

export const GroupSchema = SchemaFactory.createForClass(Group)