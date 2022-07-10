import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MaxLength, IsInt, Min, Max, IsString } from 'class-validator'


export type GroupDocument = Group & Document;

@Schema({collection: 'groups'})
export class Group {
  _id: string
  @IsString()
  @MaxLength(25, {message: 'Title is too long. Maximal length is $constraint1 characters, but actual is $value'})
  @Prop({ required: true })
  title: string

  @Prop({default: 1000})
  @IsInt()
  @Min(0)
  @Max(1000)
  listIndex: number
}

export const GroupSchema = SchemaFactory.createForClass(Group)