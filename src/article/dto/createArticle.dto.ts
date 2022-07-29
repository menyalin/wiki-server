import { IsInt, Min, Max, IsString, IsEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateArticleDto {
  @ApiProperty()
  @IsString()  
  title: string

  @ApiProperty()
  @IsInt({message: 'listIndex must be a number'})
  @Min(0)
  @Max(1000)
  listIndex?: number

  @ApiProperty()
  group?: string

  @ApiProperty()
  @IsString()
  slug: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty()
  @IsString()
  content: string

}

