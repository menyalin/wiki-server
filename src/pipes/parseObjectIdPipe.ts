import {Types, isValidObjectId } from 'mongoose'
import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isValidObjectId(value)) throw new HttpException(`Invalid ObjectId: ${value}`, HttpStatus.BAD_REQUEST)
    return new Types.ObjectId(value);
  }
}